const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
const PropertyRepository = require('../repositories/propertyRepository');
const propertyRepository = new PropertyRepository();

class PropertyService{
    async create(data){
        if(!data){
            throw new BadRequestError('please provide all values');
        }
        return await propertyRepository.create(data);
    }

    async getAll(){
        const properties = await propertyRepository.find();
        if(!properties){
            throw new BadRequestError('No existing properties');
        }
        return {properties, count: properties.length};
    }

    async getOne(id){
        if(!id){
            throw new BadRequestError('please provide Property id');
        }
        const property = await propertyRepository.findById(id);
        if(!property){
            throw new NotFoundError(`No property found with id: ${id}`);
        }

        return property;
    }

    async update(id, data){
        if(!id || !data){
            throw new BadRequestError('please provide Property id');
        }
        const property = await propertyRepository.findByIdAndUpdate({id, data});
        if(!property){
            throw new NotFoundError(`No property found with id: ${id}`);
        }

        return property;
    }

    async delete(id){
        if(!id || !data){
            throw new BadRequestError('please provide Property id');
        }
        const property = await propertyRepository.findByIdAndDelete(id);
        if(!property){
            throw new NotFoundError(`No property found with id: ${id}`);
        }
        //delete units related
        return {msg: 'Success! Property deleted'};
    }

    async deleteAll(){
        const properties = await propertyRepository.deleteMany();
        if(!properties){
            throw new NotFoundError('Error deleting all properties');
        }
        //delete units related
        return {msg: 'Success! All Propertys deleted'};
    }
}

module.exports = PropertyService;