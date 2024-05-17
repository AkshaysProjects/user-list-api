import { createTransport } from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT == 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailTemplate = (name, email, city, unsubscribeLink) => `
  <p>Hey ${name}!</p>
  <p>Thank you for signing up with your email ${email}. We have received your city as ${city}.</p>
  <p><a href="${unsubscribeLink}">Unsubscribe</a></p>
  <p>Team MathonGo.</p>
`;

export const sendMail = async (name, email, city, ubsubscribeLink) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    subject: "Welcome to MathonGo",
    html: emailTemplate(name, email, city, ubsubscribeLink),
  };

  return transporter.sendMail(mailOptions);
};
