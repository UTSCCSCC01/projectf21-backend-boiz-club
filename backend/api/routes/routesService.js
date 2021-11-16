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

const acceptPurchaseRequest = (app) => {
  app.post(
      pathPrefix + '/verify-purchase',
      verifyToken,
      async (req, res, next) => {
        try {
          const {user} = req;
          const userId = user.user_id;

          const purchaseId = req.body.purchase_id;
          await serviceService.verifyPurchaseRequest(userId, purchaseId);

          const email = await userService.getUserCredById(userId).email;

          const accept = req.body.accept;

          if (accept === true) {
            await serviceService.
                sendEmailPurchaseResult(userId, purchaseId, email, 'accepted');
          } else if (accept === false) {
            await serviceService.
                sendEmailPurchaseResult(userId, purchaseId, email, 'declined');
          }

          await serviceService.deletePurchaseRequest(purchaseId);

          res.status(200).send(
              {message: 'Successfully accept or reject a purchase request'});
        } catch (error) {
          next(error);
        }
      },
  );
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


// Start get verification requests
const retrieveVerification = (app) => {
  app.get(pathPrefix+ '/verification-request',
      verifyToken,
      async (req, res, next) => {
        try {
          const {user} = req;
          const limit = parseInt(req.query.limit);
          const skip = parseInt(req.query.skip);
          await userService.assertAdmin(user.user_id);
          const verificationRequestList =
          await serviceService.getPagableVerificationRequests(
              limit, skip,
          );
          res.status(200).send({status: 200, data: verificationRequestList});
        } catch (error) {
          next(error);
        }
      },
  );
};

const verifyService = (app) => {
  app.put(
      pathPrefix + '/verification-request',
      checkSchema(newServiceSchema),
      verifyToken,
      async (req, res, next) => {
        const {user} = req;
        const {service_id: serviceId, approved} = req.body;
        try {
          if (!serviceId || approved == null) {
            throw ApiError
                .badRequestError('service_id and approved not in payload');
          }
          await userService.assertAdmin(user.user_id);
          await serviceService.verifyService(serviceId, approved);
          res.status(200).send({
            status: 200,
            message: approved ?
            'Successfully verified service' :
            'Successfully declined verification request',
          });
        } catch (error) {
          next(error);
        }
      },
  );
};
// End get verification requests

const getServicesList = (app) => {
  app.get(pathPrefix + '/verified', async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      const servicesList = await serviceService.getServicesList(limit, skip);
      if (!servicesList) {
        throw ApiError.badRequestError('Failed to retrieve list of services');
      }
      res.status(200).json(servicesList);
    } catch (error) {
      next(error);
    }
  });
};

const getServiceDetails = (app) => {
  app.get(pathPrefix + '/:serviceId', async (req, res, next) => {
    try {
      const serviceDetails =
      await serviceService.getService(req.params.serviceId);
      if (!serviceDetails) {
        throw ApiError.notFoundError(`The service ID does not exist`);
      }
      res.status(200).json(serviceDetails);
    } catch (error) {
      next(error);
    }
  });
};

const updateService=(app)=>{
  app.put(pathPrefix, // +'/update',
      verifyToken,
      async (req, res, next)=>{
        try {
          const {user}=req;
          const serviceId=req.body.serviceId;
          const update =
          await serviceService.updateService(user.user_id, req.body);
          if (!update) {
            throw ApiError.badRequestError('Update cannot be performed');
          }

          const updatedInfo = await serviceService.getService(serviceId);

          res.status(200).json(updatedInfo);
        } catch (error) {
          next(error);
        }
      });
};

// update service endpoint
const updateServiceFees=(app) =>{
  app.put(pathPrefix +'/updateFees',
      verifyToken,
      async (req, res, next)=>{
        const {user}=req;
        const {fee}=req.body;
        try {
          await userService.assertAdmin(user.user_id);
          // console.log(fee);
          await serviceService.updateServiceFees(fee);
          res.status(200).send({
            status: 200,
            message: 'Updated fees',
          });
        } catch (e) {
          next(e);
        }
      });
};

// get service endpoint
const getServiceFees=(app) =>{
  app.get(pathPrefix +'/getFees',
      verifyToken,
      async (req, res, next)=>{
        const {user}=req;
        try {
          await userService.assertAdmin(user.user_id);
          feeObj = await serviceService.getServiceFees();
          // console.log(feeObj.fee)
          res.status(200).send({
            status: 200,
            fee: feeObj.fee.toString(),
          });
        } catch (e) {
          next(e);
        }
      });
};

// Send purchase request
const purchaseService=(app)=>{
  app.post(pathPrefix +'/purchase',
      verifyToken,
      async (req, res, next)=>{
        const {user}=req;
        const serviceId=req.body.service_id;
        try {
          await serviceService.sendPurchaseRequest(serviceId, user.user_id);
          res.status(200).send({
            status: 200,
            message: 'Purchase request sent',
          });
        } catch (e) {
          next(e);
        }
      });
};

// Start get purchase requests
const retrievePurchaseRequests = (app) => {
  app.get(pathPrefix+ '/purchase-request',
      verifyToken,
      async (req, res, next) => {
        try {
          const {user} = req;
          const userObj = await userService.getUser(user.user_id);
          if (!(userObj.authentication_lvl === 'verified' ||
          userObj.authentication_lvl === 'admin')) {
            throw ApiError.accessDeniedError();
          }
          const limit = parseInt(req.query.limit);
          const skip = parseInt(req.query.skip);
          const purchaseRequestList =
          await serviceService.getPagablePurchaseRequests(
              user.user_id, limit, skip,
          );
          res.status(200).send({status: 200, data: purchaseRequestList});
        } catch (error) {
          next(error);
        }
      },
  );
};

module.exports = (app) => {
  acceptPurchaseRequest(app);
  retrievePurchaseRequests(app);
  purchaseService(app);
  postServiceAndRequestVerification(app);
  retrieveVerification(app);
  verifyService(app);
  getServicesList(app);
  getServiceFees(app);
  updateService(app);
  getServiceDetails(app);
  updateServiceFees(app);
};
