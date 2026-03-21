import {otptemplate} from "../Template/Otptemplate.js"
import nodemailer from "nodemailer"
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "rawatabhay54321@gmail.com",
    pass: "vdnqgmyiwtxuvbzm",
  },
});

// Send an email using async/await
const sendEmail = async (receiver , subject , template) => {
  const info = await transporter.sendMail({
    from: 'Abhayrawat001',
    to: receiver,
    subject: subject,
    html: template // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
export default sendEmail;