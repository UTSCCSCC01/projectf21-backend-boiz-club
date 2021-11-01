import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

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
  const url = `${BACKEND_ENDPOINT}/api/v1/users/reset-password/` + email;
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
