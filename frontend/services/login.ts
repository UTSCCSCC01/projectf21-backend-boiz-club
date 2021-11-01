import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

// type login = (email: string, password: string) => string;

async function login(email: string, password: string) {
  const res = await axios
    .post(`${BACKEND_ENDPOINT}/api/v1/users/login`, {
      email: email,
      password: password,
    })
    .catch((err) => {
      console.log('Post operation for login failed. ' + err);
      throw err;
    });

  return res.headers['auth-token'];
}

export default login;
