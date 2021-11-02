/* eslint-disable camelcase */
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

    return await newOTP.save();
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
   * Find the OTP's ID and retrieve the OTP
   * @param {Object} otpId - the OTP's ID
   */
  getOTP: async (otpId) => {
    return await OTP.findOne({_id: otpId});
  },

  /**
     * Find the OTP's ID and delete the OTP
     * @param {Object} otpId - the OTP's ID
     */
  deleteOTP: async (otpId) => {
    return await OTP.findOneAndDelete({_id: otpId});
  },

  /**
     * Update an existing user's password
     * @param {Object} email - email of the user resetting the password
     * @param {string} newPassword - desired new password
     */
  updatePassword: async (email, newPassword) => {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt);
    hash.update(newPassword);
    const saltedHash = hash.digest('base64');
    await UserCredential.findOneAndUpdate({email: email},
        {password: saltedHash, salt: salt, updatedAt: new Date()});
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
    return await UserVerificationRequest.findOneAndRemove({user_id: userId});
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
        .find().skip(limit * skip).limit(limit).sort('createdAt');
  },

  /**
   * Update a user account's info
   * @param {String} userId - the user's ID
   * @param {String} newInfo - the new information to be updated
   */
  updateAccountInfo: async (userId, newInfo) => {
    const {first_name, last_name, address,
      phone_number, num_dogs, num_cats, profile_pic} = newInfo;

    return await User.findOneAndUpdate({_id: userId},
        {
          first_name: first_name,
          last_name: last_name,
          address: address,
          phone_number: phone_number,
          num_dogs: num_dogs,
          num_cats: num_cats,
          profile_pic: profile_pic,
          updatedAt: new Date(),
        });
  },

};

