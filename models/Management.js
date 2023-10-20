const mongoose = require('mongoose');

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
      required: [true, 'Phone number required']
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
});

module.exports = mongoose.model('Management', ManagementSchema);