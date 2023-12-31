const crypto = require('crypto');
const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')

//
const {createTokenUser,
    isTokenValid,
    attachCookiesToResponse,
    sendResetPasswordEmail,
    sendVerificationEmail,
    createHash,
} = require('../utils/index');
const origin = process.env.FRONTEND_URL || 'http://localhost:3000';

class AuthService{
    constructor(userRepository, mailService){
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    async register(userData){
        if(!userData.name || !userData.email || !userData.password){
            throw new BadRequestError('please provide all values')
        }
        const userExists = await this.userRepository.findOneByEmail(userData.email);
        if(userExists){
            throw new BadRequestError('Email already exists');
        }

        const emailVerificationToken = crypto.randomBytes(40).toString('hex');
        const newUser = await this.userRepository.create({...userData, emailVerificationToken});

        await this.mailService.sendVerificationEmail({
            name: newUser.name,
            email: newUser.email,
            verificationToken: newUser.emailVerificationToken,
            origin,
        });

        return newUser;
    }

    async verifyEmail(userData){
        if(!userData.email || !userData.emailVerificationToken){
            throw new BadRequestError('please provide all values')
        }
        const user = await this.userRepository.findOneByEmail(userData.email);
        
        if(!user){
            throw new UnauthenticatedError('verification failed');
        }
        if(user.emailVerificationToken !== userData.emailVerificationToken){
            throw new UnauthenticatedError('verification failed');
        }
        
        user.isVerified = true;
        user.verified = Date.now();
        user.emailVerificationToken = '';

        await this.userRepository.save(user);
        //send Welcome email
        return user;
    }

    async login (email, password, ip, userAgent) {
        if(!email || !password){
            throw new BadRequestError('please provide all values')
        }
        const user = await this.userRepository.findOneByEmail_PasswordReturned(email);
        if(!user){
            throw new UnauthenticatedError('invalid credentials')
        }
        if(!user.isVerified){
            throw new BadRequestError('Please verify rmail');
            ('not verified');
        }

        const isPasswordCorrect = await this.userRepository.comparePassword({user, password});
        if(!isPasswordCorrect){
            throw new UnauthenticatedError('invalid credentials');
        }

        const tokenUser = createTokenUser(user); 
        
        const existingToken = await this.userRepository.findOneByEmail(user._id);
        if(existingToken && !existingToken.isValid){
            throw new UnauthenticatedError('Invalid Credentials');
        }

        if (!existingToken) { 
            const refreshToken = crypto.randomBytes(40).toString('hex');
            const userToken = {refreshToken, ip, userAgent, user: user._id};
            await this.userRepository.createTokenUser(userToken);

            return {user: tokenUser, refreshToken};
        }
        return {user: tokenUser, refreshToken: existingToken.refreshToken};
    }

    async logout(userId){
        await this.userRepository.deleteTokenByUserId(userId);
    }

    async forgotPassword(email){
        if (!email) {
            throw new BadRequestError('Please provide valid email');
        }
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            throw new BadRequestError('User not found!');
        }
    
        const passwordToken = crypto.randomBytes(70).toString('hex');

        await this.mailService.sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin,
        });
        
        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
        
        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await this.userRepository.save(user);

        return passwordToken;
    }

    async resetPassword(email, newPassword, token){
        if (!token || !email || !newPassword) {
            throw new BadRequestError('Please provide all values');
        }
        const user = await this.userRepository.findOneByEmail(email);
        
        if (!user) {
            throw new BadRequestError('User not found!');
        }
        const currentDate = new Date();
        
        if (
            user.passwordTokenExpirationDate <= currentDate ||
            user.passwordToken !== createHash(token)
        ) {
            throw new BadRequestError('Token is invalid or expired');
        }
        user.password = newPassword;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        const newUser = await this.userRepository.save(user);
        return newUser;
    }
}

module.exports = AuthService;