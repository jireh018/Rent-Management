const sendVerificationEmail = require('./sendVerificationEmail');
const createTokenUser = require('./createTokenUser.js');
const {
    isTokenValid,
    attachCookiesToResponse,
} = require('./jwt.js');
const checkPermissions = require('./checkPermissions.js');
const sendResetPasswordEmail = require('./sendResetPasswordEmail.js');
const createHash = require('./createHash.js');
const {
    validateFieldBasedOnPropertyType,
} = require('./unitSafeCheckMethods');

module.exports = {
    createTokenUser,
    isTokenValid,
    attachCookiesToResponse,
    checkPermissions,
    sendResetPasswordEmail,
    sendVerificationEmail,
    createHash,
    validateFieldBasedOnPropertyType,
}
