import nodemailer from "nodemailer";
import path from "path";

async function sendEmail({ to, subject, html, attachmentPath }) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "stftnepalweb@gmail.com",
      pass: "Websms@123",
    },
  });

  let mailOptions = {
    from: '"STFT Nepal" <stftnepalweb@gmail.com>',
    to: to,
    subject: subject,
    html: html,
    attachments: attachmentPath
      ? [
          {
            filename: path.basename(attachmentPath), // Use the original file name with extension
            path: attachmentPath,
          },
        ]
      : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
}

export default sendEmail;
