const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
const ManagementRepository = require('../repositories/managementRepository');
const mgtRepository = new ManagementRepository();
const EmployeeRepository = require('../repositories/employeeRepository');
const employeeRepository = new EmployeeRepository();

class ManagementService{
    async create(data){
        if(!data){
            throw new BadRequestError('please provide all values');
        }
        return await mgtRepository.create(data);
    }

    async getAll(){
        const managements = await mgtRepository.find();
        if(!managements){
            throw new BadRequestError('No existing managements');
        }
        return {managements, count: managements.length};
    }

    async getOne(id){
        if(!id){
            throw new BadRequestError('please provide Management id');
        }
        const management = await mgtRepository.findById(id);
        if(!management){
            throw new NotFoundError(`No management found with id: ${id}`);
        }

        return management;
    }

    async update(id, data){
        if(!id || !data){
            throw new BadRequestError('please provide Management id');
        }
        const management = await mgtRepository.findByIdAndUpdate({id, data});
        if(!management){
            throw new NotFoundError(`No management found with id: ${id}`);
        }

        return management;
    }

    async delete(id){
        if(!id || !data){
            throw new BadRequestError('please provide Management id');
        }
        const management = await mgtRepository.findByIdAndDelete(id);
        if(!management){
            throw new NotFoundError(`No management found with id: ${id}`);
        }
        await employeeRepository.deleteByManagementId(id);
        return {msg: 'Success! Management deleted'};
    }

    async deleteAll(){
        const managements = await mgtRepository.deleteMany();
        if(!managements){
            throw new NotFoundError('Error deleting all managements');
        }
        await employeeRepository.deleteManyWithManagement();
        return {msg: 'Success! All Managements deleted'};
    }
}

module.exports = ManagementService;