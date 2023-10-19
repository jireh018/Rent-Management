const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const role = { discriminatorKey: 'role' }; // This will determine which type of user we have (Tenant, Management, etc.) userType

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        }
    },
    Phone: {
        type: String,
        minlength: 10,
        maxlength: 11,
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
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
//userOptions
//  role:{
//         type: String,
//         enum: ['admin', 'owner', 'management', 'management_employee', 'tenant'],
//         default: 'tenant',
//     },

UserSchema.pre('save', async function(){
    if(!this.isModified('password'))return;
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema);