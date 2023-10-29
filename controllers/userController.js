const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils/index');
const UserRepository = require('../repositories/userRepository');
const UserService = require('../services/userService');

class UserController{
    constructor(Model){
        this.userRepository = new UserRepository(Model);
        this.userService = new UserService(this.userRepository);
    }

    async getAllUsers (req, res) {
        const users = await this.userService.getAllUsersByRole(req.user.role);
        res.status(StatusCodes.OK).json(users);
    }

    async getSingleUser (req, res) {
        const {id} = req.params
        const user = await this.userService.getAllUsersByRole(id);
        checkPermissions(req.user, user._id);
        res.status(StatusCodes.OK).json({user});
    }

    async deleteUSer (req, res) {
        const msg = await this.userService.deleteUserById(req.user.userId);
        res.status(StatusCodes.OK).json(msg);
    }

    async updateUser (req, res) {
        const {name, email} = req.body
        const user = await this.userService.updateUserInfo({name, email}, req.user.userId);

        const tokenUser = createTokenUser(user)
        attachCookiesToResponse({res, user: tokenUser})
        res.status(StatusCodes.OK).json({user: tokenUser})
    }

    async updateUserPassword (req, res) {
        const {oldPassword, newPassword} = req.body
        const msg = await this.userService.updateUSerPassword({oldPassword, newPassword}, req.user.userId);
        res.status(StatusCodes.OK).json(msg);
    }
}

module.exports = UserController;