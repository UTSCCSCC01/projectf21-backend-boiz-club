const forgotPasswordDal = require('./dalForgotPassword');
const CryptoJS = require('crypto-js');
const {transporter, emailForgotPassword} = require('./utils/emailConfig');


module.exports = {
  sendOTPEmail: async (email) => {
    const user = await forgotPasswordDal.searchEmailUser(email);
    const otpInstance = await forgotPasswordDal.createAndPostOTP();

    const emailTemplate = emailForgotPassword(user, otpInstance.otp);

    // How to catch error from the callback function?
    await transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        const details = {
          'timestamp': otpInstance.created_at,
          'message': 'OTP has been successfully sent to the user',
          'otp_id': otpInstance.id,
        };
        const encryptedDetails = CryptoJS.AES.encrypt(
            JSON.stringify(details), process.env.PASSPHRASE);

        return encryptedDetails;
      }
    });
  },
};
