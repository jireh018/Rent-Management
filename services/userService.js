const { StatusCodes } = require('http-status-codes')
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError} = require('../errors/index')
const crypto = require('crypto');
const strongPassword = require('validator/lib/isStrongPassword');

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getAllUsersByRole(role){
        const users = await this.userRepository.findAllByRole(role);
        if(!users){
            throw new BadRequestError('No existing users');
        }
        return {users, count: users.length};
    }

    async getSingleUserById(id){
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new BadRequestError(`No existing user with id ${id}`)
        }
        return user;
    }

    async deleteUserById(id){
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new BadRequestError(`No existing user with id ${id}`)
        }
        await this.userRepository.remove(user);
        return {msg: 'Success, user remove!'};
    }

    async updateUserInfo(data, id){
        if(!data.name || !data.email){
            throw new BadRequestError('Please provide both value')
        }
        const user = await this.userRepository.findById(id);
        user.email = data.email;
        user.name = data.name;

        const newUser = await this.userRepository.save(user);
        return newUser;
    }

    async updateUSerPassword(passwords, id){
        const {oldPassword, newPassword} = passwords
        if(!oldPassword || !newPassword){
            throw new BadRequestError('Please provide both value')
        }
        if (!strongPassword(newPassword)) {
            throw new BadRequestError('Password is not strong enough');
        }

        const user = await this.userRepository.findById(id);
        const isPasswordCorrect = await this.userRepository.comparePassword({user, oldPassword});
        if (!isPasswordCorrect) {
            throw new  UnauthenticatedError('Invalid Credentials');
        }
        user.password = newPassword;

        await this.userRepository.save(user);
        return { msg: 'Success, password updated!' };
    }
}

module.exports = UserService;