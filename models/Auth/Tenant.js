const mongoose = require('mongoose');
const User = require('./User');

const TenantSchema = new mongoose.Schema({
  leaseEnd: Date,
  // ... other specific fields for tenant
});

const Tenant = User.discriminator('Tenant', TenantSchema); // 'Tenant' is the value that will be saved in 'userType' field

module.exports = Tenant;//mongoose.model('Tenant', TenantSchema);
