const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig.js');

const sendEmail = async ({ to, subject, html }) => {
    return nodemailerConfig.sendMail({
      from: '"Management Corp" <management@corp.ca>', // sender address
      to,
      subject,
      html,
    });
  };

module.exports = sendEmail