const forgotPasswordDal = require('./dalForgotPassword');
const CryptoJS = require('crypto-js');
const {transporter, emailForgotPassword} = require('./utils/emailConfig');


module.exports = {
  sendOTPEmail: async (email) => {
    const user = await forgotPasswordDal.searchEmailUser(email);
    const otpInstance = await forgotPasswordDal.createAndPostOTP();
    /* Only for testing
    const user = {
      'email': email,
    };
    */
    const emailTemplate = emailForgotPassword(user, otpInstance.otp);


    await transporter.verify();
    // How to catch error from the callback function?
    await transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        const details = {
          'timestamp': otpInstance.created_at,
          'email': email,
          'message': 'OTP has been successfully sent to the user',
          'otp_id': otpInstance.id,
        };
        const encryptedDetails = CryptoJS.AES.encrypt(
            JSON.stringify(details), process.env.PASSPHRASE);

        return encryptedDetails;
      }
    });

    /*
    try {
      await transporter.sendMail(emailTemplate);
      const details = {
        'timestamp': otpInstance.created_at,
        'check': email,
        'message': 'OTP has been successfully sent to the user',
        'otp_id': otpInstance.id,
      };

      const encryptedDetails = CryptoJS.AES.encrypt(
          JSON.stringify(details), process.env.PASSPHRASE);

      return encryptedDetails;
    } catch (error) {
      throw ApiError.badRequestError('Failed to send the email', error);
    }
    */
  },
};
