import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

export const whoAmI = async (token: string) => {
  return axios
    .get(`${BACKEND_ENDPOINT}/api/v1/users/self`, {
      headers: {
        'auth-token': token,
      },
    })
    .catch((err) => {
      console.log('Get operation for user information failed. ' + err);
      throw err;
    });
};
