const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'allison.pouros29@ethereal.email',
        pass: '7ZrR3M8VswnPPfhA4Y'
    }
});

module.exports = transporter