const sgMail = require('@sendgrid/mail')
// require('dotenv/config')
sgMail.setApiKey(process.env.SENG_GRID_API_KEY)




async function sendEmail(to, message) {
  console.log(process.env.MAIL_SENDER)
  return new Promise((resolve, reject) => { 

    const msg = {
      to: to, // Change to your recipient
        from: process.env.MAIL_SENDER, // Change to your verified sender
        subject: 'btree - confirmation',
        // text: ,
        html: `<a href="${message}">Ativar</a>`,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          resolve(true)
        })
        .catch((error) => {
          console.error(error)
          console.error(error.response.body)
           reject(null);
        })
        
    })
}
  
module.exports = {
    sendEmail
}