const Unit = require('../models/Unit');

class UnitRepository{
    async create(data){
        return await Unit.create(data);
    }

    async find(){
        return await Unit.find();
    }

    async findById(id){
        return await Unit.findById(id);
    }

    async findByIdAndUpdate({id, data}){
        return await Unit.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async findByIdAndDelete(id){
        return await Unit.findByIdAndDelete(id);
    }

    async deleteMany(){
        return await Unit.deleteMany();
    }
}

module.exports = UnitRepository;