const mongoose = require('mongoose');
const User = require('./User');

const EmployeeSchema = new mongoose.Schema({
  leaseEnd: Date,
  // ... other specific fields for tenant
});

const Employee = User.discriminator('Employee', EmployeeSchema); // 'Tenant' is the value that will be saved in 'userType' field

module.exports = Employee;//mongoose.model('Tenant', TenantSchema);
