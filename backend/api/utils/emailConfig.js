/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const emailForgotPassword = (user, otp) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = 'Pawsup Password Reset';
  const html = `
    <p>Dear ${user.first_name || user.email},</p>
    <p>We have received your password reset request.</p>
    <p>Please submit the following verification code altogether with your new password:</p>
    <p>Verification code: ${otp}</p>
    <p>If you don’t use the code within 30 minutes, it will expire.</p>


    <p>Best Regards,</p>
    <p>Pawsup Admin Team</p>
    `;
  return {from, to, subject, html};
};

module.exports = {transporter, emailForgotPassword};
