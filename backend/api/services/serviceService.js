const serviceDal = require('../repositories/dalService');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

  getPagableVerificationRequests: async (limit, skip) => {
    return await serviceDal.getPageableVerificationRequests(limit, skip);
  },

};
