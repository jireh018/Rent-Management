const express = require('express');
const router = express.Router();

const PropertyController = require('../controllers/propertyController');
const propertyController = new PropertyController();

router
    .route('/')
    .get(propertyController.getAllProperties)
    .post(propertyController.createProperty)
    .delete(propertyController.deleteAllProperties);

router
    .route('/:id')
    .get(propertyController.getOneProperty)
    .patch(propertyController.updateProperty)
    .delete(propertyController.deleteProperty);

module.exports = router;