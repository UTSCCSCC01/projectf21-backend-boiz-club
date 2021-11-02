import axios from 'axios';
import { User } from '@/types';

export const whoAmI = async (token: string) => {
  return axios
    .get('https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/self', {
      headers: {
        'auth-token': token,
      },
    })
    .catch((err) => {
      console.log('Get operation for user information failed. ' + err);
      throw err;
    });
};

export const updateAccountInfo = async (token: string, info: User) => {
  return axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/self',
      {
        ...info,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log('Put operation for user information failed. ' + err);
      throw err;
    });
};
