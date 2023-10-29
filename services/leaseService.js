const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
const LeaseRepository = require('../repositories/leaseRepository');
const leaseRepository = new LeaseRepository();

class LeaseService{
    async create(data){
        if(!data){
            throw new BadRequestError('please provide all values');
        }
        return await leaseRepository.create(data);
    }

    async getAll(){
        const leases = await leaseRepository.find();
        if(!leases){
            throw new BadRequestError('No existing leases');
        }
        return {leases, count: leases.length};
    }

    async getOne(id){
        if(!id){
            throw new BadRequestError('please provide Lease id');
        }
        const lease = await leaseRepository.findById(id);
        if(!lease){
            throw new NotFoundError(`No lease found with id: ${id}`);
        }

        return lease;
    }

    async update(id, data){
        if(!id || !data){
            throw new BadRequestError('please provide Lease id');
        }
        const lease = await leaseRepository.findByIdAndUpdate({id, data});
        if(!lease){
            throw new NotFoundError(`No lease found with id: ${id}`);
        }

        return lease;
    }

    async delete(id){
        if(!id || !data){
            throw new BadRequestError('please provide Lease id');
        }
        const lease = await leaseRepository.findByIdAndDelete(id);
        if(!lease){
            throw new NotFoundError(`No lease found with id: ${id}`);
        }
        return {msg: 'Success! Lease deleted'};
    }

    async deleteAll(){
        const leases = await leaseRepository.deleteMany();
        if(!leases){
            throw new NotFoundError('Error deleting all leases');
        }
        return {msg: 'Success! All Leases deleted'};
    }
}

module.exports = LeaseService;