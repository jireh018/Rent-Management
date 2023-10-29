const { 
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../errors/index')
const IssueRepository = require('../repositories/issueRepository');
const issueRepository = new IssueRepository();

class IssueService{
    async create(data){
        if(!data){
            throw new BadRequestError('pissue provide all values');
        }
        return await issueRepository.create(data);
    }

    async getAll(){
        const issues = await issueRepository.find();
        if(!issues){
            throw new BadRequestError('No existing issues');
        }
        return {issues, count: issues.length};
    }

    async getOne(id){
        if(!id){
            throw new BadRequestError('pissue provide Issue id');
        }
        const issue = await issueRepository.findById(id);
        if(!issue){
            throw new NotFoundError(`No issue found with id: ${id}`);
        }

        return issue;
    }

    async update(id, data){
        if(!id || !data){
            throw new BadRequestError('pissue provide Issue id');
        }
        const issue = await issueRepository.findByIdAndUpdate({id, data});
        if(!issue){
            throw new NotFoundError(`No issue found with id: ${id}`);
        }

        return issue;
    }

    async delete(id){
        if(!id || !data){
            throw new BadRequestError('pissue provide Issue id');
        }
        const issue = await issueRepository.findByIdAndDelete(id);
        if(!issue){
            throw new NotFoundError(`No issue found with id: ${id}`);
        }
        return {msg: 'Success! Issue deleted'};
    }

    async deleteAll(){
        const issues = await issueRepository.deleteMany();
        if(!issues){
            throw new NotFoundError('Error deleting all issues');
        }
        return {msg: 'Success! All Issues deleted'};
    }
}

module.exports = IssueService;