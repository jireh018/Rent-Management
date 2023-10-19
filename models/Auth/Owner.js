const mongoose = require('mongoose');
const User = require('./User');

const OwnerSchema = new mongoose.Schema({
  leaseEnd: Date,
  // ... other specific fields for tenant
});

const Owner = User.discriminator('Owner', OwnerSchema); // 'Tenant' is the value that will be saved in 'userType' field

module.exports = Owner;
