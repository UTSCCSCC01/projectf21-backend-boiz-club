/* eslint-disable new-cap */
const ApiError = require('../../error/ApiError');
const userDal = require('../repositories/dalUser');
const crypto = require('crypto');
const s3 = require('../utils/s3');
const mongoose = require('mongoose');

module.exports = {
  /**
   *  Checks if email is unique
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    return userDal.isEmailUnique(email);
  },
  /**
  * Checks if username is unique
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
     * Gets user by email and password
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
  /**
     * Saves verification request and government id
     * @param {Object} file - user government id
     * @param {Object} userId - logged in user's id
  */
  handleVerificationRequest: async (file, userId) => {
    // Check if already verified
    const user = await userDal.getUser(userId);
    if (user.authentication_lvl != 'unverified') {
      throw ApiError.badRequestError('User already verified');
    }
    // Check if user has pending verification
    const request = await userDal.getVerificationRequest(userId);
    if (request) {
      throw ApiError.badRequestError('User has a pending verification request');
    }
    // Upload file to s3
    const uploadedFile = await s3.upload(file);
    // Add pending verification to db
    await userDal.createVerificationRequest(userId, uploadedFile.key);
    return;
  },
  /**
     * Get user information
     * @param {Object} userId - user id
  */
  getUser: async (userId) => {
    return await userDal.getUser(userId);

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
