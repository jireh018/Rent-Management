const express = require('express');
const router = express.Router();

const IssueController = require('../controllers/issueController');
const issueController = new IssueController();

router
    .route('/')
    .get(issueController.getAllIssues)
    .post(issueController.createIssue)
    .delete(issueController.deleteAllIssues);

router
    .route('/:id')
    .get(issueController.getOneIssue)
    .patch(issueController.updateIssue)
    .delete(issueController.deleteIssue);

module.exports = router;