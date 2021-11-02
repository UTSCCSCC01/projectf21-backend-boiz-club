import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

export async function getVerifiedServices() {
  return axios
    .get(`${BACKEND_ENDPOINT}/api/v1/services/verified?limit=0&skip=0`)
    .then((resp) => resp.data)
    .catch((err) => {
      console.log('Get operation for verified services failed. ' + err);
      throw err;
    });
}
