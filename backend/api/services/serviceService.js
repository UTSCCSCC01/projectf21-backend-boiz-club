const serviceDal = require('../repositories/dalService');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

  getServiceDetails: async (serviceId) => {
    return await serviceDal.retrieveService(serviceId);
  },
};
