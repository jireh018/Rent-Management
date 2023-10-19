const { StatusCodes } = require('http-status-codes')
const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
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
        if(!req.body.name || !req.body.email || !req.body.password){
            throw new BadRequestError('please provide all values')
        }
        const user = await this.authService.register(req.body);
        res.status(StatusCodes.CREATED).send({user, msg:"check your email"});
    }

    async verifyEmail (req, res) {
        if(!req.body.email || !req.body.emailVerificationToken){
            throw new BadRequestError('please provide all values')
        }
        const user = await this.authService.verifyEmail(req.body);
        res.status(StatusCodes.OK).json({msg: 'email verified!'})
    }

    async login(req, res) {
        const {email, password} = req.body
        if(!email || !password){
            throw new BadRequestError('please provide all values')
        }
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
        if (!email) {
        throw new BadRequestError('Please provide valid email');
        }
    
        const userPasswordToken = await this.authService.forgotPassword(email);
    
        res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link', token : userPasswordToken });
    }

    async resetPassword (req, res) {
        const { token, email, newPassword } = req.body;
        if (!token || !email || !newPassword) {
            throw new BadRequestError('Please provide all values');
        }
        
        const updatedUser = await this.authService.resetPassword(email, newPassword, token);
        
        res
        .status(StatusCodes.OK)
        .json({ msg:'password reset successfully', updatedUser});
    }
}

module.exports = AuthController;





//    async resetPassword (req, res) {
//     const { token, email, password } = req.body;
//     if (!token || !email || !password) {
//       throw new BadRequestError('Please provide all values');
//     }
//     const user = await User.findOne({ email });
  
//     if (user) {
//       const currentDate = new Date();
  
//       if (
//         user.passwordToken === token &&
//         user.passwordTokenExpirationDate > currentDate
//       ) {
//         user.password = password;
//         user.passwordToken = null;
//         user.passwordTokenExpirationDate = null;
//         await user.save();
//       }
//     }
  
//     res
//       .status(StatusCodes.OK)
//       .json({ msg:'password reset successfully', user});
//   },

//     };
// }
// module.exports = {
//     register,
//     login,
//     logout,
//     verifyEmail,
//     forgotPassword,
//     resetPassword,
//     showCurrentUser,
//     AuthController
// }