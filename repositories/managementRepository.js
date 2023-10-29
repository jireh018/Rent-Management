const Management = require('../models/Management');

class ManagementRepository{
    async create(data){
        return await Management.create(data);
    }

    async find(){
        return await Management.find();
    }

    async findById(id){
        return await Management.findById(id).populate({
            path:'employees',
            select: 'name -management -role',
        });
    }

    async findByIdAndUpdate({id, data}){
        return await Management.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async findByIdAndDelete(id){
        return await Management.findByIdAndDelete(id);
    }

    async deleteMany(){
        return await Management.deleteMany();
    }
}

module.exports = ManagementRepository;