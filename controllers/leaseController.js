const { StatusCodes } = require('http-status-codes')
const LeaseService = require('../services/leaseService');
const leaseService = new LeaseService();

class LeaseController{
    async createLease(req, res) {
        const lease = await leaseService.create(req.body);
        res.status(StatusCodes.CREATED).json({lease});
    }

    async getAllLeases(req, res){
        const leases = await leaseService.getAll();
        res.status(StatusCodes.OK).json({leases});
    }

    async getOneLease(req, res){
        const lease = await leaseService.getOne(req.params.id);
        res.status(StatusCodes.OK).json({lease});
    }

    async updateLease(req, res){
        const lease = await leaseService.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json({lease});
    }

    async deleteLease(req, res){
        const response = await leaseService.delete(req.params.id);
        res.status(StatusCodes.OK).json({response});
    }

    async deleteAllLeases(req, res){
        const response = await leaseService.deleteAll();
        res.status(StatusCodes.OK).json({response});
    }
}

module.exports = LeaseController;