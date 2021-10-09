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
  },

  /**
   * Approve or decline user's verification request.
   * @param {Object} userId - the user id
   * @param {Object} approved - whether the user is approved/declined
   */
  verifyUser: async (userId, approved) => {
    const user = await userDal.getUser(userId);

    if (!user) {
      throw ApiError.notFoundError('User not found');
    } else if (user.authentication_lvl === 'verified') {
      throw ApiError.badRequestError('User already verified.');
    } else if (user.authentication_lvl === 'admin') {
      throw ApiError.badRequestError('Cannot verify an admin.');
    }

    // check if user has pending verification
    if (!(await userDal.getVerificationRequest(userId))) {
      throw ApiError.badRequestError('User has not requested to be verified.');
    }

    if (approved) await userDal.verifyUser(userId);
    else await userDal.removeVerificationRequest(userId);
  },
  /**
   * Get user information
   * @param {Object} userId - user id
   */
  getUser: async (userId) => {
    return await userDal.getUser(userId);
  },

  /**
     * Resets an existing user's password
     * @param {String} email - email of the user requesting the password reset
     * @param {Object} body - encryptedEmail, encryptedOTPId, otp, password
  */
  resetPassword: async (email, body) => {
    const currentDate = new Date();
    const {encryptedEmail, encryptedOTPId, otp, password} = body;

    if (!email) {
      throw ApiError.badRequestError('Email is not provided');
    }

    const algorithm = 'aes-256-cbc';

    let decipher = crypto.createDecipheriv(
        algorithm, process.env.SECURITY_KEY, process.env.INITVECTOR);
    let decryptedEmail = decipher.update(
        encryptedEmail, 'hex', 'utf-8');
    decryptedEmail += decipher.final('utf8');

    decipher = crypto.createDecipheriv(
        algorithm, process.env.SECURITY_KEY, process.env.INITVECTOR);
    let decryptedOTPId = decipher.update(
        encryptedOTPId, 'hex', 'utf-8');
    decryptedOTPId += decipher.final('utf8');

    if (decryptedEmail != email) {
      throw ApiError.badRequestError(
          `The OTP was not sent to the email ${email}`);
    }

    const otpInstance = await userDal.getOTP(
        mongoose.Types.ObjectId(decryptedOTPId));
    if (!otpInstance) {
      throw ApiError.notFoundError('The OTP does not exist in the database');
    }

    if (currentDate > otpInstance.expiration_time) {
      throw ApiError.badRequestError('The OTP is already expired');
    }
    if (otp != otpInstance.otp) {
      throw ApiError.badRequestError('The entered OTP is incorrect');
    }

    try {
      await userDal.updatePassword(email, password);
    } catch (error) {
      throw ApiError.badRequestError(
          'Failed to reset the user\'s password', error);
    }

    try {
      await userDal.deleteOTP(mongoose.Types.ObjectId(decryptedOTPId));
    } catch (error) {
      throw ApiError.badRequestError('Failed to delete the OTP', error);
    }

  },

  /**
   * Verifies a user is an admin
   * @param {Object} userId - current user's id
   */
  verifyAdmin: async (userId) => {
    const user = await userDal.getUser(userId);
    if (user.authentication_lvl != 'admin') {
      throw ApiError.accessDeniedError();
    }
    return;
  },

  /**
   * Gets a list of user verification requests that are pageable
   * @param {int} limit - number of items per page
   * @param {int} skip - number of pages to skip
   */
  getPagableVerificationRequests: async (limit, skip) => {
    return await userDal.getPageableVerificationRequests(limit, skip);
  },
};
