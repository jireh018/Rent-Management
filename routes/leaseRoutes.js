const express = require('express');
const router = express.Router();

const LeaseController = require('../controllers/leaseController');
const leaseController = new LeaseController();

router
    .route('/')
    .get(leaseController.getAllLeases)
    .post(leaseController.createLease)
    .delete(leaseController.deleteAllLeases);

router
    .route('/:id')
    .get(leaseController.getOneLease)
    .patch(leaseController.updateLease)
    .delete(leaseController.deleteLease);

module.exports = router;