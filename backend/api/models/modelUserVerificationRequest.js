const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userVerificationRequestSchema = new Schema({
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

const UserVerificationRequest = mongoose.model(
    'User_Verification_Request', userVerificationRequestSchema);

module.exports = UserVerificationRequest;
