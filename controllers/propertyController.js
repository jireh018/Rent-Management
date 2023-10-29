const { StatusCodes } = require('http-status-codes')
const PropertyService = require('../services/propertyService');
const propertyService = new PropertyService();

class PropertyController{
    async createProperty(req, res) {
        const property = await propertyService.create(req.body);
        res.status(StatusCodes.CREATED).json({property});
    }

    async getAllProperties(req, res){
        const properties = await propertyService.getAll();
        res.status(StatusCodes.OK).json({properties});
    }

    async getOneProperty(req, res){
        const property = await propertyService.getOne(req.params.id);
        res.status(StatusCodes.OK).json({property});
    }

    async updateProperty(req, res){
        const property = await propertyService.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json({property});
    }

    async deleteProperty(req, res){
        const response = await propertyService.delete(req.params.id);
        res.status(StatusCodes.OK).json({response});
    }

    async deleteAllProperties(req, res){
        const response = await propertyService.deleteAll();
        res.status(StatusCodes.OK).json({response});
    }
}

module.exports = PropertyController;