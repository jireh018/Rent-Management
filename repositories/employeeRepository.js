const Employee = require('../models/Auth/Employee');

class EmployeeRepository{
    async findByManagementId(managementId) {
    return await Employee.find({ management: managementId });
  }

  async deleteByManagementId(managementId) {
    return await Employee.deleteMany({ management: managementId });
  }

  async deleteManyWithManagement(){
    return await Employee.deleteMany({ management: { $exists: true } });
  }
}

module.exports = EmployeeRepository;