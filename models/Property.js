const mongoose = require('mongoose');
const validator = require('validator');
const canadianAddressSchema = require('./Adress');

const PropertySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Property name required!'],
    },
    address: canadianAddressSchema,
    type:{
        type: String,
        enum: ['House-Whole rented', 'Apartment Complex', 'House-Rooms rented'],
        required: [true, 'Property type required!'],
    },
    ownedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'Owner',
        required: [true, 'Owner required for the property'],
    },
    managedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Management',
        required: [true, 'A property must be managed by a management company'],
    },
    assignedToEmployee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee',
        required: [true,  'A property must be assigned to an employee'],
    },
});

PropertySchema.virtual('units', {
  ref: 'Unit',
  localField: '_id',
  foreignField: 'property',
});

module.exports = mongoose.model('Property', PropertySchema);
// ,
//     units: [{
//         type: mongoose.Schema.ObjectId,
//         ref: 'Unit',
//     }]