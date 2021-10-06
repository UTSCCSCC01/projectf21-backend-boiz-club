/* eslint-disable new-cap */
const ApiError = require('../../error/ApiError');
const userDal = require('../repositories/dalUser');
const crypto = require('crypto');
const mongoose = require('mongoose');

module.exports = {
  /**
   *
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    return userDal.isEmailUnique(email);
  },
  /**
  *
  * @param {String} username
  * @return {Boolean} whether the username is unique inside database
  */
  isUsernameUnique: async (username) => {
    return userDal.isUsernameUnique(username);
  },
  /**
     * Registers a new user
     * @param {Object} body - user credentials
  */
  registerUser: async (body) => {
    return userDal.createUser(body);
  },
  /**
     * Registers a new user
     * @param {Object} body - user login credentials
  */
  getUserByCredentials: async (body) => {
    const cred = await userDal.getCredential(body.email);
    if (!cred) {
      throw ApiError.badRequestError('Invalid credentials');
    }
    const hash = crypto.createHmac('sha512', cred.salt);
    hash.update(body.password);
    const saltedHash = hash.digest('base64');
    if (saltedHash != cred.password) {
      throw ApiError.badRequestError('Invalid credentials');
    } else return await userDal.getUser(cred.user_id);
  },

  resetPassword: async (email, body) => {
    const currentDate = new Date();
    const {key, otp, password} = body;

    if (!email) {
      throw ApiError.badRequestError('Email is not provided');
    }

    if (!key) {
      throw ApiError.badRequestError('Key is not provided');
    }
    if (!otp) {
      throw ApiError.badRequestError('OTP is not provided');
    }
    if (!password) {
      throw ApiError.badRequestError('New password is not provided');
    }

    let decodedKey;

    try {
      decodedKey = CryptoJS.AES.decrypt(encrypted, env.process.PASSPHRASE);
    } catch (error) {
      throw ApiError.badRequestError('Failed to decrypt the key', error);
    }

    const parsedKey = JSON.parse(decodedKey);
    if (parsedKey.email != email) {
      throw ApiError.badRequestError(
          `The OTP was not sent to the email ${email}`);
    }

    let otpInstance;
    try {
      otpInstance = await userDal.getOTP(mongoose.Types.ObjectId(otp.id));
    } catch (error) {
      throw ApiError.requestNotFoundError(
          'Failed to find the OTP in the database', error);
    }

    if (currentDate > otpInstance.expiration_time) {
      throw ApiError.badRequestError('The OTP is already expired');
    }
    if (otp != otpInstance.otp) {
      throw ApiError.badRequestError('The entered OTP is incorrect');
    }

    try {
      await userDal.deleteOTP(mongoose.Types.ObjectId(otp.id));
    } catch (error) {
      throw ApiError.badRequestError('Failed to delete the OTP', error);
    }
    return 'Success!';
  },
};
