const ApiError = require('../../error/ApiError');
const userDal = require('../repositories/dalUser');
const crypto = require('crypto');
const {transporter, emailForgotPassword} =
require('../../api/utils/emailConfig');
const s3 = require('../utils/s3');

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

  sendOTPEmail: async (email) => {
    const user = await userDal.searchEmailUser(email);
    const otpInstance = await userDal.createAndPostOTP();

    const emailTemplate = emailForgotPassword(user, otpInstance.otp);

    await transporter.verify();
    await transporter.sendMail(emailTemplate, (error) => {
      if (error) {
        throw ApiError.badRequestError('Failed to send the email', error);
      } else {
        const algorithm = 'aes-256-cbc';
        let cipher = crypto.createCipheriv(
            algorithm, process.env.SECURITY_KEY, process.env.INITVECTOR);

        let encryptedEmail = cipher.update(email, 'utf-8', 'hex');
        encryptedEmail += cipher.final('hex');

        cipher = crypto.createCipheriv(
            algorithm, process.env.SECURITY_KEY, process.env.INITVECTOR);

        let encryptedOTPId = cipher.update(otpInstance.id, 'utf-8', 'hex');
        encryptedOTPId += cipher.final('hex');

        return {encryptedEmail, encryptedOTPId};
      }
    });
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
  },
};
