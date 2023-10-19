const mongoose = require('mongoose');
const User = require('./User');

const ManagementSchema = new mongoose.Schema({
  department: String,
  // ... other specific fields for management
});

const Management = User.discriminator('Management', ManagementSchema);

module.exports = Management;//mongoose.model('Management', ManagementSchema);