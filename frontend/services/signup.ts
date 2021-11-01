import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

// type signup = (email: string, password: string) => string;

async function signup(email: string, username: string, password: string) {
  await axios
    .post(`${BACKEND_ENDPOINT}/api/v1/users/register`, {
      email: email,
      username: username,
      password: password,
    })
    .catch((err) => {
      console.log('Post operation for Sign-Up failed.' + err);
      throw err;
    });
}

export default signup;
