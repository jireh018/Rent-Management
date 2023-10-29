const { StatusCodes } = require('http-status-codes')
const ManagementService = require('../services/managementService');
const mgtService = new ManagementService();

class ManagementController{
    async createManagement(req, res) {
        const management = await mgtService.create(req.body);
        res.status(StatusCodes.CREATED).json({management});
    }

    async getAllManagements(req, res){
        const managements = await mgtService.getAll();
        res.status(StatusCodes.OK).json({managements});
    }

    async getOneManagement(req, res){
        const management = await mgtService.getOne(req.params.id);
        res.status(StatusCodes.OK).json({management});
    }

    async updateManagement(req, res){
        const management = await mgtService.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json({management});
    }

    async deleteManagement(req, res){
        const response = await mgtService.delete(req.params.id);
        res.status(StatusCodes.OK).json({response});
    }

    async deleteAllManagements(req, res){
        const response = await mgtService.deleteAll();
        res.status(StatusCodes.OK).json({response});
    }
}

module.exports = ManagementController;