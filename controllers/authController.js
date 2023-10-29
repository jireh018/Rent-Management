const { StatusCodes } = require('http-status-codes')
const {
    attachCookiesToResponse,
} = require('../utils/index');

const UserRepository = require('../repositories/userRepository');
const MailService = require('../services/mailService');
const AuthService = require('../services/authService');

class AuthController{
    constructor(Model){
        this.userRepository = new UserRepository(Model);
        this.mailService = new MailService();
        this.authService = new AuthService(this.userRepository, this.mailService);
    }

    async register (req, res){ 
        const user = await this.authService.register(req.body);
        res.status(StatusCodes.CREATED).send({user, msg:"check your email"});
    }

    async verifyEmail (req, res) {
        const user = await this.authService.verifyEmail(req.body);
        res.status(StatusCodes.OK).json({msg: 'email verified!'})
    }

    async login(req, res) {
        const {email, password} = req.body
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const {user, refreshToken} = await this.authService.login(email, password, ip, userAgent);
        attachCookiesToResponse({res, user, refreshToken});
        res.status(StatusCodes.OK).json({user: user});
    }

    async showCurrentUser (req, res) {
        res.status(StatusCodes.OK).json({user:req.user})
    }

    async logout (req, res) {
        await this.authService.logout(req.user.userId);

        ['accessToken', 'refreshToken'].forEach(cookieName => {
            res.cookie(cookieName, 'logout', {
            httpOnly: true,
            expires: new Date(Date.now()),
            })
        })
        res.status(StatusCodes.OK).json({msg: 'user logged out!'})
    }

    async forgotPassword (req, res) {
        const { email } = req.body;
        const userPasswordToken = await this.authService.forgotPassword(email);
    
        res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link', token : userPasswordToken });
    }

    async resetPassword (req, res) {
        const { token, email, newPassword } = req.body;
        const updatedUser = await this.authService.resetPassword(email, newPassword, token);
        
        res
        .status(StatusCodes.OK)
        .json({ msg:'password reset successfully', updatedUser});
    }
}

module.exports = AuthController;