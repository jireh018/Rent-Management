const { isTokenValid, attachCookiesToResponse } = require('../utils');
const Token = require('../models/Auth/Token.js');
const CustomError = require('../errors')

const authenticateUser = async (req, res, next) => {
    const {refreshToken, accessToken}= req.signedCookies

    try {
        if(accessToken){
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            return next()
        }

        const payload = isTokenValid(refreshToken)

        const existingToken = await Token.findOne({
            user: payload.user,
            refreshToken: payload.refreshToken,
        })

        if(!existingToken || !existingToken?.isValid){
            throw new CustomError.UnauthenticatedError('Authentication invalid');
        }

        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        })
        req.user = payload.user
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
            if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route');
        }
        next()
    }
}

//returning a function to avoid authorizePermissions being called directly in a route since function() requires a callback


module.exports = {
    authenticateUser,
    authorizePermissions,
}