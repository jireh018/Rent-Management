const mongoose = require('mongoose');
const validator = require('validator');

const IssueSchema = new mongoose.Schema({
    description: String,
    status: {
        type: String,
        enum: ['new/open', 'confirmed', 'in progress', 'pending', 'resolved', 'closed'],
    },
    raisedBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, "raisedBy field required"],
        ref: 'Tenant'
    },
    // property: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Property'
    // },
    // unit: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Unit'
    // },
    lease: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'lease field required'],
    },
    assignedTo: {
        employee: [{
            type: mongoose.Schema.ObjectId,
            required: [true, "employee field required"],
            ref: 'Employee'
        }],
        managementTeam: {
            type: mongoose.Schema.ObjectId,
            required: [true, "management field required"],
            ref: 'Management'
        },
    },
});

module.exports = mongoose.model('Issue', IssueSchema);