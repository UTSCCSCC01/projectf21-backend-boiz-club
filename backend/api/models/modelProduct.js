const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
}, {timestamps: true, versionKey: false});


const Product = mongoose.model('Product', productSchema);

module.exports=Product;
