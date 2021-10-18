const serviceDal = require('../repositories/dalService');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

};
