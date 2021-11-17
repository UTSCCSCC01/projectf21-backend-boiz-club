import axios from 'axios';

export async function getProducts() {
  return axios
    .get(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/products?limit=0&skip=0'
    )
    .then((resp) => resp.data)
    .catch((err) => {
      console.log('Get operation for products failed. ' + err);
      throw err;
    });
}
