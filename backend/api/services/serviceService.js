const serviceDal = require('../repositories/dalService');
const userDal = require('../repositories/dalUser');
const ApiError = require('../../error/ApiError');
const {transporter, emailAcceptRejectRequest} =
require('../../api/utils/emailConfig');
const axios = require('axios');

module.exports = {

  handleNewServiceRequest: async (serviceInfo, userId) => {
    const params = {
      access_key: process.env.AXIOS_API_KEY,
      query: `${serviceInfo.country} ${serviceInfo.city}
       ${serviceInfo.postal_code} ${serviceInfo.address}`,
    };
    const location =
    await axios.get('http://api.positionstack.com/v1/forward', {params}, (error) => {
      if (error) {
        throw ApiError.badRequestError('Failed to get location', error);
      }
    });
    const locationData = location.data.data[0];
    if (!locationData) {
      throw ApiError.badRequestError('Failed to get location');
    }
    return await serviceDal.createServiceAndVerificationRequest(
        serviceInfo, locationData, userId);
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


  getService: async (serviceId) => {
    return await serviceDal.getService(serviceId);
  },

  getServicesList: async (limit, skip) => {
    return await serviceDal.retrieveVerifiedServicesList(limit, skip);
  },

  updateServiceFees: async (fee)=>{
    await serviceDal.updateCostomerFee(fee);
    await serviceDal.updateProviderFee(fee);
  },

  getServiceFees: async () => {
    return await serviceDal.getServiceFees();
  },

  updateService: async (userId, body) =>{
    const {serviceId: serviceId} = body;
    const service = await serviceDal.getService(serviceId);

    if (!service) {
      throw ApiError.notFoundError('Service not found');
    } else if (userId!=service.user_id) {
      throw ApiError.badRequestError(
          'Cannot modify service that doesnt belong to you');
    }

    return await serviceDal.updateService(body);
  },

  sendPurchaseRequest: async (serviceId, userId) => {
    const service = await serviceDal.getService(serviceId);
    if (!service) {
      throw ApiError.notFoundError('Service not found');
    }
    return await serviceDal
        .sendPurchaseRequest(serviceId, service.user_id, userId);
  },

  getPagablePurchaseRequests: async (userId, limit, skip) => {
    return await serviceDal.getPagablePurchaseRequests(userId, limit, skip);
  },

  verifyPurchaseRequest: async (userId, purchaseId) => {
    const purchaseRequest = await
    serviceDal.retrievePurchaseRequestById(purchaseId);
    const serviceOwnerId = purchaseRequest.service_owner_id;

    if (userId != serviceOwnerId) {
      throw ApiError.badRequestError(
          `The user ${userId} does not own the service ${purchaseId}`);
    }
  },

  sendEmailPurchaseResult: async (userID, purchaseID, email, accept) => {
    const user = await userDal.getUser(userID);
    const firstName = user.first_name;

    const emailTemplate =
    emailAcceptRejectRequest(email, firstName, purchaseID, accept);
    await transporter.verify();
    await transporter.sendMail(emailTemplate);
  },

  deletePurchaseRequest: async (purchaseId) => {
    await serviceDal.deletePurchaseRequest(purchaseId);
  },

  getPurchaseRequestById: async (purchaseId) => {
    return await serviceDal.retrievePurchaseRequestById(purchaseId);
  },
};
