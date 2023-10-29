const express = require('express');
const router = express.Router();

const ManagementController = require('../controllers/managementController');
const mgtController = new ManagementController();

router
    .route('/')
    .get(mgtController.getAllManagements)
    .post(mgtController.createManagement)
    .delete(mgtController.deleteAllManagements);

router
    .route('/:id')
    .get(mgtController.getOneManagement)
    .patch(mgtController.updateManagement)
    .delete(mgtController.deleteManagement);

module.exports = router;