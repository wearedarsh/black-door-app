const nodemailer = require('nodemailer');
const functions = require("firebase-functions");

exports.sendSingleEmailWithTemplate = functions.https.onCall(async (data) => {
    //destruct payload
    const { recipient, body, subject, fromName, fromEmail, config } = data
    //create nodemailer transporter from config
    const transporter = nodemailer.createTransport(config)
    //try to send mail
    try{
        const mailOptions = {
            from: fromEmail,
            to: recipient,
            subject: subject,
            html: body
        }
        await transporter.sendMail(mailOptions)
    }catch(error){
        return {error: error}
    }
})