import axios from 'axios';
import { User } from '@/types';
import { getMedia, uploadMedia } from '@/services/storage';

const whoAmI = async (token: string) => {
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

const updateAccountInfo = async (token: string, info: User) => {
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
const getProfilePic = async (user: User) => {
  const base64Image = await getMedia(user?.profile_pic.trim())
    .then((resp) => resp.data.image)
    .catch((err) => {
      console.log(`[GET] profile pic: ${err}`);
      throw err;
    });

  return `data:image/png;base64,${base64Image}`;
};

const updateProfilePic = async (uri: string, token: string) => {
  const resp = await uploadMedia(uri);

  axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/self',
      {
        profile_pic: JSON.parse(resp.body).mediaId,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
    .catch((err) => {
      console.log(`[PUT] for update profile pic: ${err}`);
      throw err;
    });
};

export { whoAmI, getProfilePic, updateProfilePic, updateAccountInfo };
