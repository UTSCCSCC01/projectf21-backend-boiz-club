import axios from 'axios';

export async function getVerifiedServices() {
  return axios
    .get(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/verified?limit=0&skip=0'
    )
    .then((resp) => resp.data)
    .catch((err) => {
      console.log('Get operation for verified services failed. ' + err);
      throw err;
    });
}
