let SCREEN_STATE = 0; // contacts
let OPENED_CONTACT_ID = null;
let OPENED_CONTACT_NAME = null;
function goToContacts() {
  SCREEN_STATE = 0;
  OPENED_CONTACT_ID = null;
  OPENED_CONTACT_NAME = null;
  const chatElement = document.getElementById("chat-container");
  const messagesElement = document.getElementById("messages-container");
  while (messagesElement.hasChildNodes()) {
    messagesElement.lastChild.remove();
  }
  chatElement.style.left = "100%";
}

async function openChat(id, name, last_message, not_read_count, pic) {
  SCREEN_STATE = 1;
  OPENED_CONTACT_ID = id;
  console.log(OPENED_CONTACT_ID);
  OPENED_CONTACT_NAME = name;
  const chatElement = document.getElementById("chat-container");

  chatElement.style.left = "0";

  setTimeout(() => {
    const elchat = document.getElementById("messages-container");
    elchat.scrollTop = elchat.scrollHeight;
  }, 150);
  const messages = await getMessagesWhereContactIdIs(id);
  appendMessagesToUI(messages);
  await updateContactNotReadMessages(id, name, last_message, null);
  updateContactNotReadMessagesUI(id, null);
  const img = document.getElementById("chat-header-contact-image");
  const n = document.getElementById("chat-header-name");
  n.innerText = name;
  img.src = pic;
  img.onclick = () => (window.location.href = `/user.html?id=${id}`);
}

function handleBackButton() {
  const backbtn = document.getElementById("go-back-button");
  backbtn.addEventListener("click", goBack);
}

function goBack() {
  const r = window.localStorage.getItem("before-chat");
  if (r) {
    window.localStorage.removeItem("before-chat");
    window.location.href = r;
  } else {
    window.history.back();
  }
}

const main = async () => {
  if ("indexedDB" in window) {
    // IndexedDB is supported
    console.log("IndexedDB is supported in this browser.");
  } else {
    alert("IndexedDB is not supported in this browser");
    return;
  }

  await runUserActivitiesAndUpdateHeaderAndSidebar();

  const opened = await openDatabase();
  if (opened) {
    const urlParams = new URLSearchParams(window.location.search);

    const contactId = urlParams.get("contact_id");
    const contactName = urlParams.get("contact_name");

    if (contactId && contactName) {
      const contactFound = await findContactById(Number(contactId));
      if (!contactFound) {
        await createContact(Number(contactId), contactName, "", null);
      }
    }

    const contacts = await getAllContacts();
    if (contacts.length > 0) {
      const ids = contacts.map((contact) => {
        return contact.id;
      });
      const pictures = await getPictures(ids);
      console.log(pictures);
      pictures.map((picture, i) => {
        contacts[i].picture = pictures[i].user_image;
      });
      appendContactsToUI(contacts);
    }
    // await createIncomingMessage('oi', 5, 'ze')
  }
  handleBackButton();
};

function runprofilepicanimationandredirect() {
  const userimage = document.getElementById("user-image");
  userimage.classList.add("clicked");
  setTimeout(() => {
    userimage.classList.remove("clicked");
    window.location.href = "profile1.html?coming_from_route='main.html'";
  }, 60);
}
async function fitUserInfo(name, url) {
  const userimage = document.getElementById("user-image");
  userimage.src = url;
  userimage.addEventListener("click", runprofilepicanimationandredirect);
}
async function getMyUserInfo() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.href = "/a.html";
    return;
  }
  TOKEN = token;
  const res = await fetch("https://ggsrc.tech/gui", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { name, url } = await res.json();
    return { name, url };
  } else {
    window.localStorage.removeItem("token");
    window.location.href = "/a.html";
  }
}
async function runUserActivitiesAndUpdateHeaderAndSidebar() {
  const user = await getMyUserInfo();
  fitUserInfo(user.name, user.url);
}

async function getPictures(ids) {
  const res = await fetch("https://ggsrc.tech/giids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
    body: JSON.stringify({ ids }),
  });
  if (res.status == 200) {
    const data = await res.json();
    return data.pictures;
  } else {
    console.log("err");
  }
}

let last = null;
function appendMessagesToUI(messages) {
  const messagesElement = document.getElementById("messages-container");
  messages.forEach((message) => {
    const singleMessageContainer = document.createElement("div");

    singleMessageContainer.className = "single-message-container";

    const div = document.createElement("div");
    if (message.receiver.id == "me") {
      // message is not mine
      if (last == "me") {
        div.innerHTML = `<p class="message before-me others-message">${message.text}</p>`;
      } else {
        div.innerHTML = `<p class="message others-message">${message.sender.name} ${message.text}</p>`;
      }
      last = "me";
    } else {
      if (last == "mine") {
        div.innerHTML = `<p class="message before-mine my-message" id="${message.receiver.id}:${SENT_MESSAGE_COUNT}">${message.text}</p>`;
      } else {
        div.innerHTML = `<p class="message my-message" id="${message.receiver.id}:${SENT_MESSAGE_COUNT}">'Eu: ' ${message.text}</p>`;
      }
      last = "mine";
    }
    singleMessageContainer.append(div);
    messagesElement.append(singleMessageContainer);
  });
}

function appendContactsToUI(contacts) {
  const contactsElement = document.getElementById("contacts-container");
  contacts.forEach((contact) => {
    const div = document.createElement("div");
    div.id = `contact-${contact.id}`;

    div.style =
      "display: flex; background-color: #fff; border-radius: 10px; text-align: center;background: white; gap: 8px; padding: 5px 10px 5px 10px";
    div.innerHTML = `
    <div>
                    <div style="width: 50px; height: 100%; border-radius: 50%; overflow: hidden;" class="f f-cntr">
                        <img class="rounded" src="${
                          contact.picture ||
                          "https://images.pexels.com/photos/1317844/pexels-photo-1317844.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }" alt="User Image" style="width: 50px; height: 50px; object-fit: cover;">
                    </div>
                </div>
                <div style="flex: 2; text-align: left; padding: 0;">
                    <p style="font-size: 18px; font-weight: 600; color: gray;">${
                      contact.name
                    }</p>
                    <p id="contact-${
                      contact.id
                    }-last-message" style="color: gray;" class="fsz-09">${
      contact.last_message
    }</p>
        
                    <div style="margin-top: 0; gap: 8px; background: red;" class="f">
                        
                
                        <p id="contact-${contact.id}-not-read-count">${
      contact.not_read_count || ""
    }</p>
                    </div>
                </div>
    `;

    div.addEventListener("click", () =>
      openChat(
        contact.id,
        contact.name,
        contact.last_message,
        contact.not_read_count,
        contact.picture
      )
    );
    contactsElement.append(div);
  });
}
function updateContactLastMessageUI(id, last_message) {
  const contactElement = document.getElementById(`contact-${id}-last-message`);
  contactElement.innerText = last_message;
}

function updateContactNotReadMessagesUI(id, not_read_count) {
  const contactNotReadCount = document.getElementById(
    `contact-${id}-not-read-count`
  );
  contactNotReadCount.innerText = not_read_count;
}

let db;
async function openDatabase() {
  return new Promise((resolve, reject) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    const request = indexedDB.open("ChatAppDatabase", 1);
    request.onsuccess = function (event) {
      db = event.target.result;
      console.log("Database opened successfully");
      resolve(true);
    };
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      const contactsStore = db.createObjectStore("contacts", { keyPath: "id" });
      const messagesStore = db.createObjectStore("messages", {
        keyPath: "id",
        autoIncrement: true,
      });
      if (!messagesStore.indexNames.contains("chatKeyIndex")) {
        messagesStore.createIndex("chatKeyIndex", "chatKey");
      }
      if (!messagesStore.indexNames.contains("contactIndex")) {
        messagesStore.createIndex("contactIndex", "contact");
      }
    };
    request.onerror = function (event) {
      console.error("Error opening the database:", event.target.error);
      reject();
    };
  });
}

async function createIncomingMessage(text, sender_id, sender_name) {
  return new Promise((resolve, reject) => {
    const messageTransaction = db.transaction("messages", "readwrite");
    const messagesStore = messageTransaction.objectStore("messages");
    const newMessage = {
      contact: sender_id,
      text,
      sender: { id: sender_id, name: sender_name },
      receiver: { id: "me", name: "me" },
      timestamp: new Date(),
    };
    const addMessageRequest = messagesStore.add(newMessage);
    addMessageRequest.onsuccess = function (event) {
      console.log("Message added successfully");
      resolve(true);
    };
    addMessageRequest.onerror = function (event) {
      console.error("Error adding message:", event.target.error);
      reject();
    };
  });
}
async function createMyMessage(text, contact, receiver_id, receiver_name) {
  return new Promise((resolve, reject) => {
    const messageTransaction = db.transaction("messages", "readwrite");
    const messagesStore = messageTransaction.objectStore("messages");
    const newMessage = {
      contact: contact,
      text,
      sender: { id: "me", name: "me" },
      receiver: { id: receiver_id, name: "Anonimo" },
      timestamp: new Date(),
    };
    const addMessageRequest = messagesStore.add(newMessage);
    addMessageRequest.onsuccess = function (event) {
      console.log("Message added successfully");
      resolve(true);
    };
    addMessageRequest.onerror = function (event) {
      console.error("Error adding message:", event.target.error);
      reject();
    };
  });
}

function createContact(id, name, last_message, not_read_count) {
  return new Promise((resolve, reject) => {
    const contactTransaction = db.transaction("contacts", "readwrite");
    const contactsStore = contactTransaction.objectStore("contacts");
    const newContact = {
      id: id,
      name: name,
      last_message: last_message,
      not_read_count: not_read_count | null,
    };
    const addContactRequest = contactsStore.add(newContact);
    addContactRequest.onsuccess = function (event) {
      resolve(true);
    };
    addContactRequest.onerror = function (event) {
      reject();
    };
  });
}

async function findContactById(id) {
  return new Promise((resolve, reject) => {
    const contactTransaction = db.transaction("contacts", "readonly");
    const contactsStore = contactTransaction.objectStore("contacts");
    const getRequest = contactsStore.get(id);
    getRequest.onsuccess = function (event) {
      const contact = event.target.result;
      if (contact) {
        resolve(contact);
      } else {
        resolve(null);
      }
    };
    getRequest.onerror = function (event) {
      reject();
    };
  });
}

function getMessagesWhereContactIdIs(id) {
  return new Promise((resolve, reject) => {
    const messageTransaction = db.transaction("messages", "readonly");
    const messagesStore = messageTransaction.objectStore("messages");
    const contactIndex = messagesStore.index("contactIndex");

    const range = IDBKeyRange.only(id);
    const request = contactIndex.openCursor(range);

    const messages = [];

    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        messages.push(cursor.value);
        cursor.continue();
      } else {
        resolve(messages);
      }
    };

    request.onerror = function (event) {
      reject();
    };
  });
}

async function updateContactLastMessage(
  id,
  name,
  last_message,
  not_read_count
) {
  return new Promise(async (resolve, reject) => {
    const contactTransaction = db.transaction("contacts", "readwrite");
    const contactsStore = contactTransaction.objectStore("contacts");
    const updatedContact = { id, name, last_message, not_read_count };
    const putRequest = await contactsStore.put(updatedContact);
    putRequest.onsuccess = function (event) {
      resolve();
    };
    putRequest.onerror = function (event) {
      reject();
    };
  });
}

async function updateContactNotReadMessages(
  id,
  name,
  last_message,
  not_read_count
) {
  return new Promise(async (resolve, reject) => {
    const contactTransaction = db.transaction("contacts", "readwrite");
    const contactsStore = contactTransaction.objectStore("contacts");
    const updatedContact = { id, name, last_message, not_read_count };
    const putRequest = await contactsStore.put(updatedContact);
    putRequest.onsuccess = function (event) {
      resolve();
    };
    putRequest.onerror = function (event) {
      reject();
    };
  });
}

async function getAllContacts() {
  return new Promise((resolve, reject) => {
    const contactTransaction = db.transaction("contacts", "readonly");
    const contactsStore = contactTransaction.objectStore("contacts");
    const getAllContactsRequest = contactsStore.getAll();
    getAllContactsRequest.onsuccess = function (event) {
      const contacts = event.target.result;
      resolve(contacts);
    };
    getAllContactsRequest.onerror = function (err) {
      reject();
    };
  });
}

main();

// script two
let token = localStorage.getItem("token");
const serverUrl = "wss://ggsrc.tech:443"; // Replace with your WebSocket server URL

const socket = new WebSocket(`${serverUrl}?token=${token}`);

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened.");

  setTimeout(() => {
    requestMissingMessages();
  }, 750);
});

function requestMissingMessages() {
  socket.send(
    JSON.stringify({
      TYPE: "GET_MISSING_MESSAGES",
      token: window.localStorage.getItem("token"),
    })
  );
}

socket.addEventListener("message", async (event) => {
  const data = JSON.parse(event.data);

  if (data.TYPE == "MESSAGE_ACK") {
    handleMessageAck(data.ack_id);
  } else if (data.TYPE == "NEW_INCOMING_MESSAGE") {
    await handleNewMessage(data);
  } else if (data.TYPE == "MISSING_MESSAGES") {
    const promises = data.missing_messages.map(async (m) => {
      await handleNewMessage(m);
    });

    await Promise.all(promises);
  }
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
  // Handle WebSocket errors.
});

socket.addEventListener("close", (event) => {
  if (event.wasClean) {
    console.log(
      `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
    );
  } else {
    console.error("WebSocket connection died");
  }
});

async function handleNewMessage(data) {
  let contact = await findContactById(data.sender.id);
  if (!contact) {
    await createContact(data.sender.id, data.sender.name, data.text);
    contact = await findContactById(data.sender.id);
    const contact_picture = await getPictures([data.sender.id]);
    console.log(contact_picture);

    appendContactsToUI([
      {
        id: data.sender.id,
        name: data.sender.name,
        picture: contact_picture[0].user_image,
        last_message: data.text,
        not_read_count: 1,
      },
    ]);
  } else {
    await updateContactLastMessage(
      contact.id,
      contact.name,
      data.text,
      contact.not_read_count
    );
    updateContactLastMessageUI(contact.id, data.text);
  }

  if (SCREEN_STATE == 0) {
    // contact screen
    console.log("zero");
    console.log(contact);
    if (contact?.not_read_count == null || contact?.not_read_count == 0) {
      contact.not_read_count = 1;
    } else {
      contact.not_read_count++;
    }
    await updateContactNotReadMessages(
      contact.id,
      contact.name,
      data.text,
      contact.not_read_count
    );
    updateContactNotReadMessagesUI(contact.id, contact.not_read_count);
    await createIncomingMessage(data.text, data.sender.id, data.sender.name);
  } else if (OPENED_CONTACT_ID == data.sender.id) {
    // same chat from the received message
    await createIncomingMessage(data.text, data.sender.id, data.sender.name);
    appendMessagesToUI([
      {
        contact: data.sender.id,
        text: data.text,
        sender: { id: data.sender.id, name: data.sender.name },
        receiver: { id: "me", name: "me" },
      },
    ]);
  } else {
    // chat is open but not the one that sent the message
    await createIncomingMessage(data.text, data.sender.id, data.sender.name);
  }
}

function handleMessageAck(message_id) {
  console.log(message_id + " was acked");
}

let SENT_MESSAGE_COUNT = 0;
async function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = {
    token: window.localStorage.getItem("token"),
    receiver: OPENED_CONTACT_ID,
    text: messageInput.value,
    ack_id: SENT_MESSAGE_COUNT,
    TYPE: "SEND_MESSAGE",
  };
  await createMyMessage(
    message.text,
    message.receiver,
    message.receiver,
    OPENED_CONTACT_NAME
  );
  appendMessagesToUI([
    {
      contact: message.receiver,
      text: message.text,
      sender: { id: "me", name: "me" },
      receiver: { id: message.receiver, name: OPENED_CONTACT_NAME },
    },
  ]);

  //update contact last message
  await updateContactLastMessage(
    OPENED_CONTACT_ID,
    OPENED_CONTACT_NAME,
    messageInput.value
  );
  updateContactLastMessageUI(OPENED_CONTACT_ID, messageInput.value);

  socket.send(JSON.stringify(message));
  SENT_MESSAGE_COUNT++;
  messageInput.value = null;
}
// Example of sending a message to the server:
// socket.send('Hello, server!');
