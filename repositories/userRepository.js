const Token = require('../models/Auth/Token')
class UserRepository{
    constructor(model){
        this.model = model;
    }

    async findOneByEmail(email){
        return this.model.findOne({email});//.select('+password')
    }

    async create(userData){
        return this.model.create(userData);
    }

    async comparePassword({user, password}){
        return user.comparePassword(password);
    }

    async save(user){
        return user.save();
    }

    async findTokenByUser(userId) {
        return Token.findOne({ user: userId });
    }

    async createTokenUser(userToken) {
        return Token.create(userToken);
    }

    async deleteTokenByUserId(userId){
        return Token.findOneAndDelete({user: userId})
    }
}

module.exports = UserRepository;