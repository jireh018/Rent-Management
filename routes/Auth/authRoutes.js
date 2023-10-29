const express = require('express');
const {authenticateUser, authorizePermissions} = require('../../middlewares/authentication');

const AuthController = require('../../controllers/authController');

const router = express.Router();

const userModels = {
    Admin: require('../../models/Auth/Admin'),
    Owner: require('../../models/Auth/Owner'),
    //Management: require('../../models/Auth/Management'),
    Employee: require('../../models/Auth/Employee'),
    Tenant: require('../../models/Auth/Tenant')
};

const routeAuthorization = {
    //'/management/register': ['Admin'],
    '/employee/register': ['Admin', 'Management'],
    '/tenant/register': ['Admin', 'Management', 'Employee'],
};

Object.keys(userModels).forEach(userModel => {
    const authController = new AuthController(userModels[userModel]);

    // if(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`]){
    //     router.post(`/${userModel.toLocaleLowerCase()}/register`, [authenticateUser, 
    //     authorizePermissions(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`][0])],
    //     authController.register.bind(authController));
    //     // console.log(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`][0])
    // }
    router.post(`/${userModel.toLocaleLowerCase()}/register`, authController.register.bind(authController));
    router.post(`/${userModel.toLocaleLowerCase()}/login`, authController.login.bind(authController));
    router
        .get(`/${userModel.toLocaleLowerCase()}/show-me`, authenticateUser, authController.showCurrentUser.bind(authController));
    router
        .delete(`/${userModel.toLocaleLowerCase()}/logout`, authenticateUser,authController.logout.bind(authController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/verify-email`, authController.verifyEmail.bind(authController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/forgot-password`, authController.forgotPassword.bind(authController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/reset-password`, authController.resetPassword.bind(authController));
});
    
module.exports = router;