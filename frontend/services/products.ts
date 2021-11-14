import axios from 'axios';

export async function getProducts() {
  return [
    {
      _id: '1',
      product_name: 'Product 1',
      product_description: 'Description 1',
      product_price: 123,
    },
    {
      _id: '12',
      product_name: 'Product 2',
      product_description: 'Description 2',
      product_price: 321,
    },
  ];
  //   return axios
  //     .get(
  //       'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/verified?limit=0&skip=0'
  //     )
  //     .then((resp) => resp.data)
  //     .catch((err) => {
  //       console.log('Get operation for verified services failed. ' + err);
  //       throw err;
  //     });
}
