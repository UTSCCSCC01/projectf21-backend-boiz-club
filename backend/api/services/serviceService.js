const serviceDal = require('../repositories/dalService');
const ApiError = require('../../error/ApiError');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, userId);
  },

  getPagableVerificationRequests: async (limit, skip) => {
    return await serviceDal.getPageableVerificationRequests(limit, skip);
  },

  verifyService: async (serviceId, approved) => {
    const service = await serviceDal.getService(serviceId);

    if (!service) {
      throw ApiError.notFoundError('Service not found');
    } else if (service.verified) {
      throw ApiError.badRequestError('Service already verified.');
    }

    // check if service has pending verification
    if (!(await serviceDal.getVerificationRequest(serviceId))) {
      throw ApiError.badRequestError(
          'Service has not been requested to be verified.',
      );
    }

    if (approved) await serviceDal.verifyService(serviceId);
    else await serviceDal.removeVerificationRequestAndService(serviceId);
  },

};
