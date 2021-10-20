const ApiError = require('../../error/ApiError');
const verifyToken = require('../utils/verifyToken');
const constants = require('../../constants');
const pathPrefix = constants.ApiPrefix+'/services';
const userService = require('../services/serviceUser');
const serviceService = require('../services/serviceService');
const {validationResult, checkSchema} = require('express-validator');

const newServiceSchema = {
  service_name: {
    notEmpty: true,
    errorMessage: 'Please enter a name for your service',
    bail: true,
  },
  service_description: {
    notEmpty: true,
    errorMessage: 'Please enter a description for your service',
    bail: true,
  },
  service_price: {
    notEmpty: true,
    errorMessage: 'Please enter a price for your service',
    bail: true,
  },
  contact_number: {
    notEmpty: true,
    errorMessage: 'Please enter a contact number',
    bail: true,
  },
  country: {
    notEmpty: true,
    errorMessage: 'Country of origin is required',
    bail: true,
  },
  city: {
    notEmpty: true,
    errorMessage: 'City of origin is required',
    bail: true,
  },
  postal_code: {
    notEmpty: true,
    errorMessage: 'Postal code is required',
    bail: true,
  },
  address: {
    notEmpty: true,
    errorMessage: 'Address is required',
    bail: true,
  },
};

const postServiceAndRequestVerification = (app) => {
  app.post(
      pathPrefix + '/request-verification',
      checkSchema(newServiceSchema),
      verifyToken,
      async (req, res, next) => {
        const {body} = req;
        const userId = req.user.user_id;
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            throw ApiError.badRequestError('Bad request', errors.array());
          }
          const user = await userService.getUser(userId);
          if (!(user.authentication_lvl === 'verified' ||
              user.authentication_lvl === 'admin')) {
            throw ApiError.accessDeniedError();
          }
          await serviceService.handleNewServiceRequest(body, userId);
          res.status(200)
              .send({status: 200,
                message: 'Successfully created post, awaiting verification'});
        } catch (error) {
          next(error);
        }
      },
  );
};

const getServicesList = (app) => {
  app.get(pathPrefix + '/services-list', async (req, res, next) => {
    try {
      const servicesList = await serviceService.getServicesList();
      if (!servicesList) {
        throw ApiError.badRequestError('Failed to retrieve list of services');
      }
      res.status(200).json(servicesList);
    } catch (error) {
      next(error);
    }
  });
};

module.exports = (app) => {
  postServiceAndRequestVerification(app);
  getServicesList(app);
};
