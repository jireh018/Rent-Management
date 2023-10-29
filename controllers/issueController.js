const { StatusCodes } = require('http-status-codes')
const IssueService = require('../services/issueService');
const issueService = new IssueService();

class IssueController{
    async createIssue(req, res) {
        const issue = await issueService.create(req.body);
        res.status(StatusCodes.CREATED).json({issue});
    }

    async getAllIssues(req, res){
        const issues = await issueService.getAll();
        res.status(StatusCodes.OK).json({issues});
    }

    async getOneIssue(req, res){
        const issue = await issueService.getOne(req.params.id);
        res.status(StatusCodes.OK).json({issue});
    }

    async updateIssue(req, res){
        const issue = await issueService.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json({issue});
    }

    async deleteIssue(req, res){
        const response = await issueService.delete(req.params.id);
        res.status(StatusCodes.OK).json({response});
    }

    async deleteAllIssues(req, res){
        const response = await issueService.deleteAll();
        res.status(StatusCodes.OK).json({response});
    }
}

module.exports = IssueController;