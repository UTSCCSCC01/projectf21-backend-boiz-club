import axios from 'axios';

// type login = (email: string, password: string) => string;

async function getServiceFee(token: string) {
  const res = await axios
    .get(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/getFees',
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log('Get operation for fees failed. ' + err);
      throw err;
    });

  return res.data;
}

async function updateServiceFee(fee: number, token: string) {
  await axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/updateFees',
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
