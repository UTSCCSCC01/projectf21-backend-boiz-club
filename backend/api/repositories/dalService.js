/* eslint-disable new-cap */
// Schema Models
const Service = require('../models/modelService');
const ServiceVerificationRequest =
require('../models/modelServiceVerificationRequest');
const mongoose = require('mongoose');

module.exports = {

  createServiceAndVerificationRequest: async (serviceInfo, userId) => {
    const service = new Service(
        {
          user_id: userId,
          service_name: serviceInfo.service_name,
          service_description: serviceInfo.service_description,
          service_price: serviceInfo.service_price,
          contact_number: serviceInfo.contact_number,
          country: serviceInfo.country,
          city: serviceInfo.city,
          postal_code: serviceInfo.postal_code,
          address: serviceInfo.address,
        },
    );
    const serviceId = service._id;
    await service.save();
    const serviceVerificationRequest = new ServiceVerificationRequest(
        {service_id: serviceId},
    );
    return await serviceVerificationRequest.save();
  },

  retrieveService: async (serviceId) => {
    return await Service.findOne({_id: mongoose.Types.ObjectId(serviceId)});
  },
};
