const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  service_name: {
    type: String,
    required: true,
  },
  service_description: {
    type: String,
    required: true,
  },
  service_price: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
}, {timestamps: true, versionKey: false});


const Service = mongoose.model('Service', serviceSchema);

module.exports=Service;
