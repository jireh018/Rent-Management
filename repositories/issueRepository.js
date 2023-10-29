const Issue = require('../models/Issue');

class IssueRepository{
    async create(data){
        return await Issue.create(data);
    }

    async find(){
        return await Issue.find();
    }

    async findById(id){
        return await Issue.findById(id);
    }

    async findByIdAndUpdate({id, data}){
        return await Issue.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async findByIdAndDelete(id){
        return await Issue.findByIdAndDelete(id);
    }

    async deleteMany(){
        return await Issue.deleteMany();
    }
}

module.exports = IssueRepository;