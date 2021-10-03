const crypto = require('crypto');

// Schema Models
const User = require('../models/modelUser');
const UserCredential = require('../models/modelUserCredential');
const OTP = require('../models/modelOTP');


module.exports = {
  /**
   *
   * @param {String} email
   * @return {Boolean} whether the email is unique inside database
   */
  isEmailUnique: async (email) => {
    const result = await UserCredential.find({email});
    return result.length == 0;
  },
  /**
   *
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

  getCredential: async (email) => {
    return await UserCredential.findOne({email: email});
  },

  getUser: async (userId) => {
    return await User.findOne({_id: userId});
  },

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


