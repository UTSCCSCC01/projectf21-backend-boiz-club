import axios from 'axios';

export async function getAccountVerificationRequests(token: string) {
  return axios
    .get(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/verification-request?limit=0&skip=0',
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .then((resp) => resp.data.data)
    .catch((err) => {
      console.log('Get operation for verification request failed. ' + err);
      throw err;
    });
}

export async function getServiceInfoByID(serviceID: string) {
  return {
    user_id: '615750353994b8f4f25e6f57',
    service_name: 'Dog care service',
    service_description: 'Provide care to your dog, duh?',
    service_price: 14,
    contact_number: '1234567890',
    country: 'Canada',
    city: 'Markham',
    postal_code: 'A1B2C3',
    address: '123 Adress Rd',
    verified: false,
  };
}

export async function getServiceVerificationRequests(token: string) {
  return [
    { _id: '1', service_id: '1', createdAt: '2021-10-01T18:15:17.249+00:00' },
    { _id: '2', service_id: '2', createdAt: '2021-10-02T18:15:17.249+00:00' },
  ];
}

export async function getUserInfoByID(userID: string) {
  return axios
    .get(`https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/${userID}`)
    .then((resp) => resp.data)
    .catch((err) => {
      console.log('Get operation for user info failed. ' + err);
      throw err;
    });
}
export async function verifyServiceByID(
  serviceId: string,
  approval: boolean,
  token: string
) {
  await new Promise((res) => setTimeout(res, 1000));
}
export async function verifyUserByID(
  userId: string,
  approval: boolean,
  token: string
) {
  return axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/verification-request',
      {
        user_id: userId,
        approved: approval,
      },
      {
        headers: {
          'auth-token': token,
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      }
    )
    .catch((err) => {
      console.log('Put operation for verification request failed. ' + err);
      throw err;
    });
}

export async function getIDPhotoData(key: string) {
  return axios
    .get(
      `https://pawsup-dev-oznda.ondigitalocean.app/api/v1/storage/media/${key}`
    )
    .catch((err) => {
      console.log('Get operation for ID photo failed. ' + err);
      throw err;
    });
}
