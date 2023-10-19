const express = require('express');
const User = require('../models/User.js');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils/index');

const getAllUsers = async (req, res) => {
    const users = await User.find({role:'user'}).select('-password')
    if(!users){
        throw new CustomError.BadRequestError('No existing users')
    }
    res.status(StatusCodes.OK).json({users, count:users.length})
}

const getSingleUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id}).select('-password')
    if(!user){
        throw new CustomError.BadRequestError(`No existing user with id ${id}`)
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async (req, res) => {
    const {name, email} = req.body
    if(!name || !email){
        throw new CustomError.BadRequestError('Please provide both value')
    }
    const user = await User.findOne({_id: req.user.userId})

    user.email = email
    user.name = name
    await user.save()

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({user: tokenUser})
}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Please provide both value')
    }

    const user = await User.findOne({_id: req.user.userId})
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError. UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
}

export {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserPassword,
}