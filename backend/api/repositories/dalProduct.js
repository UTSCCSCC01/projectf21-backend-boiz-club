const Product = require('../models/modelProduct');

module.exports = {
  retrieveProductsList: async (limit, skip) => {
    return await Product.find({}).skip(limit * skip).limit(limit).sort('_id');
  },
};
