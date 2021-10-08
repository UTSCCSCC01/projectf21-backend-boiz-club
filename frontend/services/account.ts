import axios from 'axios';

export const whoAmI = async (token) => {
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
