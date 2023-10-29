const express = require('express');
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');

const UserController = require('../controllers/userController');

const router = express.Router();

const userModels = {
    Admin: require('../models/Auth/Admin'),
    Owner: require('../models/Auth/Owner'),
    //Management: require('../../models/Auth/Management'),
    Employee: require('../models/Auth/Employee'),
    Tenant: require('../models/Auth/Tenant')
};

const routeAuthorization = {
    //'/management/register': ['Admin'],
    '/employee/register': ['Admin', 'Management'],
    '/tenant/register': ['Admin', 'Management', 'Employee'],
};

Object.keys(userModels).forEach(userModel => {
    const userController = new UserController(userModels[userModel]);

    router.get(`/${userModel.toLocaleLowerCase()}`, authenticateUser, userController.getAllUsers.bind(userController));
    router
        .patch(`/${userModel.toLocaleLowerCase()}/delete-user`, authenticateUser, userController.deleteUSer.bind(userController));
    router
        .patch(`/${userModel.toLocaleLowerCase()}/update-user`, authenticateUser,userController.updateUser.bind(userController));
    router
        .patch(`/${userModel.toLocaleLowerCase()}/update-password`, authenticateUser,userController.updateUserPassword.bind(userController));
    router
        .get(`/${userModel.toLocaleLowerCase()}/:id`, authenticateUser, userController.getSingleUser.bind(userController));
});
    
module.exports = router;