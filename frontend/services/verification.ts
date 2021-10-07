import axios from 'axios';

export async function getVerificationRequests() {
  return [
    {
      _id: '1',
      user_id: '6158c2eee888f0728fb18e09',
      img_key: 'b46e16d0-b9b7-47b4-8741-7d808c80ef23.jpg',
      createdAt: '2021-10-03T22:02:28.939+00:00',
    },
    {
      _id: '2',
      user_id: '615dbca77648b83c79897ced',
      img_key: '77f6e33b-fc8c-42fb-9395-3a6ceb2efbf6.JPG',
      createdAt: '2021-10-04T22:02:28.939+00:00',
    },
  ];
}

export async function getUserInfoByID(userID: string) {
  return {
    _id: '3',
    username: 'Mark3',
    first_name: null,
    last_name: null,
    address: null,
    phone_number: null,
    authentication_lvl: 'unverified',
    createdAt: '2021-10-01T18:15:17.249+00:00',
    updatedAt: '2021-10-01T18:15:17.249+00:00',
  };
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
