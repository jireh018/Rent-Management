const mongoose = require('mongoose');
const validator = require('validator');
const Property = require('./Property');
const {
    validateFieldBasedOnPropertyType,
} = require('../utils');

const UnitSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.ObjectId,
        ref: 'Property',
        required: true
    },
    roomNumber: {
        type: Number,
        //unique: true,
    },
    apartmentNumber: {
        type: Number,
    },
    floor: {
        type: Number,
    },
    size: {
        type: String,
        enum: ['Master', 'Small', 'Medium'],
    },
    numberOfBedRooms: {
        type: Number,
    },
    assignedToEmployee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee',
        //required: [true,  'A property must be assigned to an employee'],
    },
});

UnitSchema.pre(['save', 'update', 'findOneAndUpdate'], async function(next){
    await validateFieldBasedOnPropertyType(this);
    next();
});

// UnitSchema.virtual('managedBy', {
//   ref: 'Management',
//   localField: '_id',
//   foreignField: 'unit',
// });

// UnitSchema.virtual('assignedToEmployee', {
//   ref: 'Employee',
//   localField: '_id',
//   foreignField: 'unit',
// });

module.exports = mongoose.model('Unit', UnitSchema);