const CustomError = require('../errors')

const checkPermissions = (reqUser, resUserId) => {
    if(reqUser.role === 'admin') return
    if(reqUser.userId === resUserId.toString()) return
    throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

//reqUser : connected user; resUserId : id passed on params
module.exports = checkPermissions