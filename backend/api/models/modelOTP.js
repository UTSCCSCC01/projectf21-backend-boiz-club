const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  expiration_time: {
    type: Date,
    required: true,
  },
});

otpSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
