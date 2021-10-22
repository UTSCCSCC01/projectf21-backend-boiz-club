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
  return axios
    .get(
      `https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/${serviceID}`
    )
    .then((resp) => resp.data)
    .catch((err) => {
      console.log('Get operation for service info failed. ' + err);
      throw err;
    });
}

export async function getServiceVerificationRequests(token: string) {
  return axios
    .get(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/verification-request?limit=0&skip=0',
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .then((resp) => resp.data.data)
    .catch((err) => {
      console.log(
        'Get operation for service verification request failed. ' + err
      );
      throw err;
    });
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
  return axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/services/verification-request',
      {
        service_id: serviceId,
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
      console.log(
        'Put operation for service verification request failed. ' + err
      );
      throw err;
    });
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
