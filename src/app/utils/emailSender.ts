import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (email: string, html: string, subject: string) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.sender_email,
        pass: config.sender_app_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    await transporter.sendMail({
      from: '"GardenWiz" <roycoder95@gmail.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line.
      //text: "Hello world?", // plain text body
      html, // html body
    });
  };

  export const EmailHelper = {
    sendEmail,
  };