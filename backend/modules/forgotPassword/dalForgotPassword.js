const mongoose = require('mongoose');
const ApiError = require('../../error/ApiError');
const otpGenerator = require('otp-generator');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  expiration_time: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const userCredentialSchema = new mongoose.Schema({
  email: {
    type: String,
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
const UserCredential = mongoose.model(
    'UserCredential', userCredentialSchema, 'user_credentials');

module.exports = {
  createAndPostOTP: async () => {
    const otp = otpGenerator.generate(
        6, {alphabets: false, upperCase: false, specialChars: false});
    const expirationTime = new Date(new Date().getTime() + 30*60000);

    const newOTP = new OTP({
      otp: otp,
      expiration_time: expirationTime,
    });

    try {
      const savedOTP = await newOTP.save();
      return savedOTP;
    } catch (error) {
      throw ApiError.badRequestError(`The OTP ${otp.id} cannot be saved`);
    }
  },

  searchEmailUser: async (email) => {
    try {
      const user = await UserCredential.findOne({email: email});
      return user;
    } catch (err) {
      throw ApiError.requestNotFoundError(
          `There is no email ${email} in the database`, err);
    }
  },
};

