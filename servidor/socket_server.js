
const WebSocket = require("ws");
const {clearMessages,} = require("./joi");

const wss = new WebSocket.Server({ server: server });

let arr = [];
let stored = [];

wss.on("connection", (socket, b) => {
  // WebSocket connection established
  try {
    if (b.url.substring(0, 8) != "/?token=") socket.close();
    const token = b.url.substring(8);
    if (!token) throw new Error("Unauthorized");

    const is_token_valid = verifyAccessToken(token);
    if (!is_token_valid) throw new Error("Unauthorized");

    const decoded = decodeAccessToken(token);
    if (!decoded) throw new Error("Unauthorized");

    arr.push({ token: token, id: decoded.id, name: decoded.name, socket });

    //const msges = stored.filter(m => m?.receiver_id == decoded.id)
    //console.log('msges')
    //console.log(msges)
    //socket.send(JSON.stringify({ TYPE: 'MISSING_MESSAGES', missing_messages: msges }))
  } catch (err) {
    socket?.close();
    return;
  }
  socket.on("message", (data) => {
    const messageString = data.toString("utf8");
    let message = JSON.parse(messageString);

    if (message.TYPE == "SEND_MESSAGE") {
      const sender = arr.find((el) => el.token == message.token);
      if (!sender) return; //todo

      const response = { TYPE: "MESSAGE_ACK", ack_id: message.ack_id };
      socket.send(JSON.stringify(response));

      const receiver = arr.find((el) => el.id == message.receiver);
      message.text = clearMessages(message);
      if (!receiver) {
        // store message
        stored.push({
          receiver_id: message?.receiver,
          text: message.text,
          sender: { id: sender.id, name: sender.name },
        }); //fix
      } else {
        receiver?.socket?.send(
          JSON.stringify({
            TYPE: "NEW_INCOMING_MESSAGE",
            text: message.text,
            sender: { id: sender.id, name: sender.name },
          })
        );
      }
    } else if (message.TYPE == "GET_MISSING_MESSAGES") {
      const sender = arr.find((el) => el.token == message.token);
      if (!sender) return;
      const msges = stored.filter((m) => m.receiver_id == sender.id);
      stored = stored.filter((m) => m.receiver.id != sender.id);
      socket.send(
        JSON.stringify({ TYPE: "MISSING_MESSAGES", missing_messages: msges })
      );
    }
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed.");
    arr = arr.filter(function (el) {
      return el.socket !== socket;
    });
    console.log(arr);
    // Handle WebSocket connection close events.
  });
});
