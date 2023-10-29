const express = require('express');
const router = express.Router();

const UnitController = require('../controllers/unitController');
const unitController = new UnitController();

router
    .route('/')
    .get(unitController.getAllUnits)
    .post(unitController.createUnit)
    .delete(unitController.deleteAllUnits);

router
    .route('/:id')
    .get(unitController.getOneUnit)
    .patch(unitController.updateUnit)
    .delete(unitController.deleteUnit);

module.exports = router;