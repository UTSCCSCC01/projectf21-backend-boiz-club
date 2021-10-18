const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceVerificationRequestSchema = new Schema({
  service_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServiceVerificationRequest = mongoose.model(
    'Service_Verification_Request', serviceVerificationRequestSchema);

module.exports = ServiceVerificationRequest;
