const IMailService = require('../interfaces/IMailService');
const sendEmail = require('../utils/sendEmail');

class CurrentMailService extends IMailService {
    sendVerificationEmail(data) {
        const {name,email,verificationToken,origin} = data;
        const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

        const message = `<p>Please confirm your email by clicking on the following link : 
        <a href="${verifyEmail}">Verify Email</a> </p> <p>Email verification token : ${verificationToken}</p>`;

        return sendEmail({
            to: email,
            subject: 'Email Confirmation',
            html: `<h4> Hello, ${name}</h4>
            ${message}
            `,
        });
    }

    sendResetPasswordEmail ({ name, email, token, origin }){
        const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
        const message = `<p>Please reset password by clicking on the following link : 
        <a href="${resetURL}">Reset Password</a></p>`;

        return sendEmail({
            to: email,
            subject: 'Reset Password',
            html: `<h4>Hello, ${name}</h4>
        ${message}
        `,
        });
    }
}

module.exports = CurrentMailService;