import axios from 'axios';

/**
 * type resetPassword = (email: string,
 *                      encryptedEmail: string,
 *                      encryptedOTPId: string,
 *                      otp: string,
 *                      password: string) => any;
 */

async function resetPassword(
  email: string,
  encryptedEmail: string,
  encryptedOTPId: string,
  otp: string,
  password: string
) {
  const url = 'http://.../api/v1/users/reset-password/' + email;
  const res = await axios
    .post(url, {
      encryptedEmail: encryptedEmail,
      encryptedOTPId: encryptedOTPId,
      otp: otp,
      password: password,
    })
    .catch((err) => {
      console.log('Post operation for reset-password failed. ' + err);
      throw err;
    });

  return res.data;
}

export default resetPassword;
