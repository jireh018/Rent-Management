const Token = require('../models/Auth/Token')
class UserRepository{
    constructor(model){
        this.model = model;
    }

    async findOneByEmail(email){
        return await this.model.findOne({email});//.select('+password')
    }

    async findOneByEmail_PasswordReturned(email){
        return await this.model.findOne({email}).select('+password');
    }

    async create(userData){
        return await this.model.create(userData);
    }

    async comparePassword({user, password}){
        return await user.comparePassword(password);
    }

    async save(user){
        return await user.save();
    }

    async remove(user){
        return await user.remove();
    }

    async findTokenByUser(userId) {
        return await Token.findOne({ user: userId });
    }

    async createTokenUser(userToken) {
        return await Token.create(userToken);
    }

    async deleteTokenByUserId(userId){
        return await Token.findOneAndDelete({user: userId})
    }

    async findAllByRole(role){
        return await this.model.find({role}).select('-password');
    }

    async findById(id){
        return await this.model.findOne({_id: id}).select('-password');
    }
}

module.exports = UserRepository;