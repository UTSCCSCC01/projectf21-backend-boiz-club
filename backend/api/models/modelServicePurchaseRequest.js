const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicePurchaseRequestSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  service_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServicePurchaseRequest = mongoose.model(
    'Service_Purchase_Request', servicePurchaseRequestSchema);

module.exports = ServicePurchaseRequest;
