const ApiError = require('../../error/ApiError');
const userDal = require('../repositories/dalUser');
const crypto = require('crypto');
const {transporter, emailForgotPassword} =
require('../../api/utils/emailConfig');

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

  sendOTPEmail: async (email) => {
    const user = await userDal.searchEmailUser(email);
    const otpInstance = await userDal.createAndPostOTP();

    const emailTemplate = emailForgotPassword(user, otpInstance.otp);


    await transporter.verify();
    // How to catch error from the callback function?
    await transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        const algorithm = 'aes-256-cbc';
        const initVector = crypto.randomBytes(16);
        const securityKey = process.env.PASSPHRASE;

        const cipher = crypto.createCipheriv(
            algorithm, securityKey, initVector);
        const encryptedEmail = cipher.update(email, 'utf-8', 'hex');
        const encryptedOTPId = cipher.update(otpInstance.id, 'utf-8', 'hex');

        return {encryptedEmail, encryptedOTPId};
      }
    });
  },
};
