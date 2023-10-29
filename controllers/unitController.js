const { StatusCodes } = require('http-status-codes')
const UnitService = require('../services/unitService');
const unitService = new UnitService();

class UnitController{
    async createUnit(req, res) {
        const unit = await unitService.create(req.body);
        res.status(StatusCodes.CREATED).json({unit});
    }

    async getAllUnits(req, res){
        const units = await unitService.getAll();
        res.status(StatusCodes.OK).json({units});
    }

    async getOneUnit(req, res){
        const unit = await unitService.getOne(req.params.id);
        res.status(StatusCodes.OK).json({unit});
    }

    async updateUnit(req, res){
        const unit = await unitService.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json({unit});
    }

    async deleteUnit(req, res){
        const response = await unitService.delete(req.params.id);
        res.status(StatusCodes.OK).json({response});
    }

    async deleteAllUnits(req, res){
        const response = await unitService.deleteAll();
        res.status(StatusCodes.OK).json({response});
    }
}

module.exports = UnitController;