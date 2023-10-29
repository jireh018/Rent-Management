const Property = require('../models/Property');

class PropertyRepository{
    async create(data){
        return await Property.create(data);
    }

    async find(){
        return await Property.find();
    }

    async findById(id){
        return await Property.findById(id);
    }

    async findByIdAndUpdate({id, data}){
        return await Property.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async findByIdAndDelete(id){
        return await Property.findByIdAndDelete(id);
    }

    async deleteMany(){
        return await Property.deleteMany();
    }
}

module.exports = PropertyRepository;