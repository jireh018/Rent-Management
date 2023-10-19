const awilix = require('awilix');
const AuthService = require('../services/authService');
const AuthController = require('../controllers/authController');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function setup() {
    container.register({
        authService: awilix.asClass(AuthService).singleton(),
        authController: awilix.asClass(AuthController).singleton()
    });
}

module.exports = { container, setup };