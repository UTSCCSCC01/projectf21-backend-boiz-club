import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

// type forgotPassword = (email: string) => any;

async function forgotPassword(email: string) {
  const url = `${BACKEND_ENDPOINT}/api/v1/users/forgot-password/` + email;
  const res = await axios
    .post(url, {
      email: email,
    })
    .catch((err) => {
      console.log('Post operation for forgot-password failed. ' + err);
      throw err;
    });

  return res.data;
}

export default forgotPassword;
