const productDal = require('../repositories/dalProduct');

module.exports = {
  getProductsList: async (limit, skip) => {
    return await productDal.retrieveProductsList(limit, skip);
  },
};
