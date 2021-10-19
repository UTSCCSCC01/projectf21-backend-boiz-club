const serviceDal = require('../repositories/dalService');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

  getServicesList: async() => {
    return await serviceDal.retrieveServicesList();
  }
};
