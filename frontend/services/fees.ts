import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

// type login = (email: string, password: string) => string;

async function getServiceFee(token: string) {
  const res = await axios
    .get(`${BACKEND_ENDPOINT}/api/v1/services/getFees`, {
      headers: {
        'auth-token': token,
      },
    })
    .catch((err) => {
      console.log('Get operation for fees failed. ' + err);
      throw err;
    });

  return res.data;
}

async function updateServiceFee(fee: number, token: string) {
  await axios
    .put(
      `${BACKEND_ENDPOINT}/api/v1/services/updateFees`,
      {
        fee: fee,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log('Put operation for fees failed.' + err);
      throw err;
    });
}

export { getServiceFee, updateServiceFee };
