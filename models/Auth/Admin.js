const mongoose = require('mongoose');
const User = require('./User');

const AdminSchema = new mongoose.Schema({
  leaseEnd: Date,
  // ... other specific fields for tenant
});

const Admin = User.discriminator('Admin', AdminSchema); // 'Tenant' is the value that will be saved in 'userType' field

module.exports = Admin;//mongoose.model('Tenant', TenantSchema);
