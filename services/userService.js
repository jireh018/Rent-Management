const { StatusCodes } = require('http-status-codes')
const { CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,} = require('../errors/index')
const {createTokenUser,
    isTokenValid,
    attachCookiesToResponse,
    sendResetPasswordEmail,
    sendVerificationEmail,
    createHash,
} = require('../utils/index');
const crypto = require('crypto');

class UserService{
    constructor(model){
        this.model = model;
    }

    async register(data){
        const {name, email, password} = data
        
        //const userAlreadyExists = await this.model.findOne({email});
        const userAlreadyExists = await this.model.findOne({email});
        if(userAlreadyExists){
            throw new BadRequestError('Email already exists')
        }

        const isFirstAccount = await this.model.countDocuments({}) === 0;
        const role = isFirstAccount? 'admin' : 'tenant';

        const emailVerificationToken = crypto.randomBytes(40).toString('hex')
        const user = await this.model.create({name, email, password, role, emailVerificationToken});

        const origin = 'http://localhost:3000';
        await sendVerificationEmail({
            name: user.name,
            email: user.email,
            verificationToken: user.emailVerificationToken,
            origin,
        })

        return user;
    }

    async verifyEmail(data) {
        const {emailVerificationToken, email } = data
        if(!emailVerificationToken || !email){
            throw new BadRequestError('Please provide all values')
        }
        const user = await this.model.findOne({email})
        if(!user){
            throw new UnauthenticatedError('verification failed')
        }

        if(user.emailVerificationToken !== emailVerificationToken){
            throw new UnauthenticatedError('verification failed')
        }
        user.isVerified = true
        user.verified = Date.now()
        user.emailVerificationToken = ''

        await user.save()

        res.status(StatusCodes.OK).json({msg: 'email verified'})
    }

    async login(data) {
        const {email, password} = req.body
        if(!email || !password){
            throw new BadRequestError('please provide all values')
        }

        const user = await this.model.findOne({email})//.select('+password')
        if(!user){
            throw new UnauthenticatedError('invalid credentials')
        }
        if(!user.isVerified){
            throw new BadRequestError('Please verify rmail');
            ('not verified');
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect){
            throw new UnauthenticatedError('invalid credentials')
        }
        if(!user.isVerified){
            throw new UnauthenticatedError('Please verify your email')
        }

        const tokenUser = createTokenUser(user)
        // create refresh token
        let refreshToken = '';
        // check for existing token
        const existingToken = await Token.findOne({ user: user._id });

        if (existingToken) {
            const { isValid } = existingToken;
            if (!isValid) {
            throw new UnauthenticatedError('Invalid Credentials');
            }
            refreshToken = existingToken.refreshToken;
            attachCookiesToResponse({ res, user: tokenUser, refreshToken });
            res.status(StatusCodes.OK).json({ user: tokenUser });
            return;
        }

        refreshToken = crypto.randomBytes(40).toString('hex');
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const userToken = { refreshToken, ip, userAgent, user: user._id };

        await Token.create(userToken);

        attachCookiesToResponse({res, user: tokenUser, refreshToken})
        res.status(StatusCodes.OK).json({user: user})
    }

    async showCurrentUser (user) {
        res.status(StatusCodes.OK).json({user:req.user})
    }

    async logout (id) {
        await Token.findOneAndDelete({user: req.user.userId})

        res.cookie('accessToken', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now()),
        })

        res.cookie('refreshToken', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now()),
        })

        res.status(StatusCodes.OK).json({msg: 'user logged out!'})
    }

    async forgotPassword (data) {
        const { email } = req.body;
        if (!email) {
        throw new BadRequestError('Please provide valid email');
        }
    
        const user = await this.model.findOne({ email });
    
        if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        // send email
        const origin = 'http://localhost:3000';
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin,
        });
    
        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    
        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
        }
    
        res
        .status(StatusCodes.OK)
        .json({ msg: 'Please check your email for reset password link', token : user.passwordToken });
    };

  async resetPassword (data) {s
    const { token, email, password } = req.body;
    if (!token || !email || !password) {
      throw new BadRequestError('Please provide all values');
    }
    const user = await this.model.findOne({ email });
  
    if (user) {
      const currentDate = new Date();
  
      if (
        user.passwordToken === token &&
        user.passwordTokenExpirationDate > currentDate
      ) {
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
      }
    }
  
    res
      .status(StatusCodes.OK)
      .json({ msg:'password reset successfully', user});
  };  
}

module.exports = UserService;