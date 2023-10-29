const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const PhoneNumber = require('libphonenumber-js');

const role = { discriminatorKey: 'role' }; // This will determine which type of user we have (Tenant, Management, etc.) userType

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
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
    phone:{
        type: String,
        //required: [true, 'Phone number required'],
        minlength: 3,
        validator:{
        validator: function(v) {
            const phoneNumber = PhoneNumber.parse(v, 'CA');
            return PhoneNumber.isValidNumber(phoneNumber);
        },
        message: props => `${props.value} is not a valid Canadian phone number!`
        },
        //required: [true, 'Phone number required']
    },
    birthdate: {
        type: Date,
        validate: {
            validator: function(v) {
                // Just a basic check, you can add more validation if needed
                return validator.isDate(v.toString());
            },
            message: props => `${props.value} is not a valid date!`
        },
        //required: [true, 'Birthdate required']
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false,
    },
   
    isVerified: {type: Boolean, default: false},
    verified: Date,
    emailVerificationToken: String,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
}, role);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema);