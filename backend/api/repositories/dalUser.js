const crypto = require('crypto');

// Schema Models
const User = require('../models/modelUser');
const UserCredential = require('../models/modelUserCredential');


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

};


