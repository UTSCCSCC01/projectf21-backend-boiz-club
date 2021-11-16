const ApiError = require('../../error/ApiError');
const constants = require('../../constants');
const pathPrefix = constants.ApiPrefix+'/products';
const productService = require('../services/serviceProducts');

const getServicesList = (app) => {
  app.get(pathPrefix, async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      const productsList = await productService.getProductsList(limit, skip);
      if (!productsList) {
        throw ApiError.badRequestError('Failed to retrieve list of services');
      }
      res.status(200).json(productsList);
    } catch (error) {
      next(error);
    }
  });
};

module.exports = (app) => {
  getServicesList(app);
};
