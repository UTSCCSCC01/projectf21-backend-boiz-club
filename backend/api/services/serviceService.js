const serviceDal = require('../repositories/dalService');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

  getServicesList: async (limit, skip) => {
    return await serviceDal.retrievePageableServicesList(limit, skip);
  },
};
