const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationRequestSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  img_key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const VerificationRequest = mongoose.model(
    'Verification_Request', verificationRequestSchema);

module.exports=VerificationRequest;
