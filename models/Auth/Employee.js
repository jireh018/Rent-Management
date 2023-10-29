const mongoose = require('mongoose');
const User = require('./User');

const EmployeeSchema = new mongoose.Schema({
  leaseEnd: Date,
  management: {
    type: mongoose.Schema.ObjectId,
    ref: 'Management',
    required: [true, 'An employee must belong to a management company'],
  },
});

const Employee = User.discriminator('Employee', EmployeeSchema); // 'Tenant' is the value that will be saved in 'userType' field

EmployeeSchema.virtual('PropertyAssignedToMe', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'employee',
});

EmployeeSchema.virtual('unitAssignedToMe', {
  ref: 'Unit',
  localField: '_id',
  foreignField: 'employee',
});

module.exports = Employee;//mongoose.model('Tenant', TenantSchema);
