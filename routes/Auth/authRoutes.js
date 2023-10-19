const express = require('express');
const {authenticateUser, authorizePermissions} = require('../../middlewares/authentication');

const AuthController = require('../../controllers/authController');

const router = express.Router();

const userModels = {
    Admin: require('../../models/Auth/Admin'),
    Owner: require('../../models/Auth/Owner'),
    Management: require('../../models/Auth/Management'),
    Employee: require('../../models/Auth/Employee'),
    Tenant: require('../../models/Auth/Tenant')
};

const routeAuthorization = {
    '/management/register': ['Admin'],
    '/employee/register': ['Admin', 'Management'],
    '/tenant/register': ['Admin', 'Management', 'Employee'],
};

Object.keys(userModels).forEach(userModel => {
    const userController = new AuthController(userModels[userModel]);

    if(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`]){
        router.post(`/${userModel.toLocaleLowerCase()}/register`, [authenticateUser, 
        authorizePermissions(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`][0])],
        userController.register.bind(userController));
        // console.log(routeAuthorization[`/${userModel.toLocaleLowerCase()}/register`][0])
    }
    router.post(`/${userModel.toLocaleLowerCase()}/register`, userController.register.bind(userController));
    router.post(`/${userModel.toLocaleLowerCase()}/login`, userController.login.bind(userController));
    router
        .get(`/${userModel.toLocaleLowerCase()}/show-me`, authenticateUser, userController.showCurrentUser.bind(userController));
    router
        .delete(`/${userModel.toLocaleLowerCase()}/logout`, authenticateUser,userController.logout.bind(userController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/verify-email`, userController.verifyEmail.bind(userController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/forgot-password`, userController.forgotPassword.bind(userController));
    router
        .post(`/${userModel.toLocaleLowerCase()}/reset-password`, userController.resetPassword.bind(userController));
});
    


module.exports = router;