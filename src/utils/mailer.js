// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // ou outro serviço (Outlook, Yahoo, etc)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let sendMail = async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
