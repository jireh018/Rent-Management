const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
const UnitRepository = require('../repositories/unitRepository');
const unitRepository = new UnitRepository();

class UnitService{
    async create(data){
        if(!data){
            throw new BadRequestError('please provide all values');
        }
        return await unitRepository.create(data);
    }

    async getAll(){
        const units = await unitRepository.find();
        if(!units){
            throw new BadRequestError('No existing units');
        }
        return {units, count: units.length};
    }

    async getOne(id){
        if(!id){
            throw new BadRequestError('please provide Unit id');
        }
        const unit = await unitRepository.findById(id);
        if(!unit){
            throw new NotFoundError(`No unit found with id: ${id}`);
        }

        return unit;
    }

    async update(id, data){
        if(!id || !data){
            throw new BadRequestError('please provide Unit id');
        }
        const unit = await unitRepository.findByIdAndUpdate({id, data});
        if(!unit){
            throw new NotFoundError(`No unit found with id: ${id}`);
        }

        return unit;
    }

    async delete(id){
        if(!id || !data){
            throw new BadRequestError('please provide Unit id');
        }
        const unit = await unitRepository.findByIdAndDelete(id);
        if(!unit){
            throw new NotFoundError(`No unit found with id: ${id}`);
        }
        return {msg: 'Success! Unit deleted'};
    }

    async deleteAll(){
        const units = await unitRepository.deleteMany();
        if(!units){
            throw new NotFoundError('Error deleting all units');
        }
        return {msg: 'Success! All Units deleted'};
    }
}

module.exports = UnitService;