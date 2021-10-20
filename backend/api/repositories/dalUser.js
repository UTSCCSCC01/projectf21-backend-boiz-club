const crypto = require('crypto');
const mongoose = require('mongoose');

// Schema Models
const User = require('../models/modelUser');
const UserCredential = require('../models/modelUserCredential');
const UserVerificationRequest =
require('../models/modelUserVerificationRequest');
const OTP = require('../models/modelOTP');
const otpGenerator = require('otp-generator');

module.exports = {
  /**
   *  Checks if email is unique
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    const result = await UserCredential.find({email});
    return result.length == 0;
  },
  /**
   *  Checks if username is unique
   * @param {String} username
   * @return {Boolean} whether the username is unique inside database
   */
  isUsernameUnique: async (username) => {
    const result = await User.find({username});
    return result.length == 0;
  },
  /**
   * Registers a new user
   * @param {Object} body - user credentials
   */
  createUser: async (body) => {
    const {username, email, password} = body;
    const user = new User({username});
    const userID = user.id;
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const saltedHash = hash.digest('base64');
    const userCred = new UserCredential({
      email,
      password: saltedHash,
      user_id: userID,
      salt,
    });
    await userCred.save();
    return user.save();
  },

  /**
   * Gets user credentials by email
   * @param {Object} email - user email
   */
  getCredential: async (email) => {
    return await UserCredential.findOne({email: email});
  },

  /**
   * Gets user information by user id
   * @param {Object} userId - user id
   */
  getUser: async (userId) => {
    return await User.findOne({_id: userId});
  },

  /**
   * Generate OTP and save it into the database
   */
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

  /**
   * Creates a verification request for a user
   * @param {Object} userId - user id
   * @param {Object} imgKey - image key in s3 bucket to government id
   */
  createVerificationRequest: async (userId, imgKey) => {
    const request = new UserVerificationRequest({
      user_id: userId,
      img_key: imgKey,
    });
    return await request.save();
  },

  /**
   * Gets a verification request created by a user
   * @param {Object} userId - user id
   */
  getVerificationRequest: async (userId) => {
    return await UserVerificationRequest.findOne({user_id: userId});
  },
  /**
   * Removes a verification request created by a user
   * @param {Object} userId - user id
   */
  removeVerificationRequest: async (userId) => {
    return UserVerificationRequest.findOneAndRemove({user_id: userId});
  },
  /**
   * Verifies an user
   * @param {Object} userId - user id
   */
  verifyUser: async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // verify user
      await User.findOneAndUpdate(
          {_id: userId},
          {authentication_lvl: 'verified'},
      );

      // remove verification request
      await UserVerificationRequest.findOneAndRemove({user_id: userId});

      // send changes
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  },

  /**
   * Gets a list of user verification requests that are pageable
   * @param {int} limit - number of items per page
   * @param {int} skip - number of pages to skip
   */
  getPageableVerificationRequests: async (limit, skip) =>{
    return await UserVerificationRequest
        .find().skip(limit * skip).limit(limit).sort('_id');
  },

};

