const mongoose = require('mongoose');
const validator = require('validator');
const PhoneNumber = require('libphonenumber-js');
const canadianAddressSchema = require('./Adress');

const ManagementSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'Please provide property management name'],
      minlength: 3,
    },
    phone:{
      type: String,
      required: [true, 'Phone number required'],
      minlength: 3,
      validator:{
        validator: function(v) {
          const phoneNumber = PhoneNumber.parse(v, 'CA');
          return PhoneNumber.isValidNumber(phoneNumber);
        },
        message: props => `${props.value} is not a valid Canadian phone number!`
      },
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'Email required'],
        unique: true
    },
    website: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            },
            message: props => `${props.value} is not a valid website URL!`
        },
        required: [true, 'Website required']
    },
    address: canadianAddressSchema,
    //employees: [{ type: mongoose.Schema.ObjectId, ref: 'Employee' }],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

//virtual fields not stored in the document
ManagementSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'management',
});

ManagementSchema.virtual('propertiesManaged', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'management',
});

ManagementSchema.virtual('unitsManaged', {
  ref: 'Unit',
  localField: '_id',
  foreignField: 'management',
});

module.exports = mongoose.model('Management', ManagementSchema);