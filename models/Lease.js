const mongoose = require('mongoose');
const validator = require('validator');

const LeaseSchema = new mongoose.Schema({
    tenant: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tenant'
    }],
    startDate: {
        type: Date,
        validate: {
            validator: function(v) {
                // Ensure the date is in the format 'yyyy-mm-dd'
                return /^(\d{4})-(\d{2})-(\d{2})$/.test(v.toISOString().substring(0, 10));
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    endDate: {
        type: Date,
        validate: {
            validator: function(v) {
                // Ensure the date is in the format 'yyyy-mm-dd'
                return /^(\d{4})-(\d{2})-(\d{2})$/.test(v.toISOString().substring(0, 10));
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    property: {
        type: mongoose.Schema.ObjectId,
        ref: 'Property'
    },
    unit: {
        type: mongoose.Schema.ObjectId,
        ref: 'Unit'
    },
    //employeeAssigned,
    rentAmount: Number
});

module.exports = mongoose.model('Lease', LeaseSchema);