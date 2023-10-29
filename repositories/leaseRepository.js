const Lease = require('../models/Lease');

class LeaseRepository{
    async create(data){
        return await Lease.create(data);
    }

    async find(){
        return await Lease.find();
    }

    async findById(id){
        return await Lease.findById(id);
    }

    async findByIdAndUpdate({id, data}){
        return await Lease.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async findByIdAndDelete(id){
        return await Lease.findByIdAndDelete(id);
    }

    async deleteMany(){
        return await Lease.deleteMany();
    }
}

module.exports = LeaseRepository;