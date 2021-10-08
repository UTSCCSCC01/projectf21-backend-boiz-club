import axios from 'axios';

// type forgotPassword = (email: string) => any;

async function forgotPassword(email: string) {
  const url = 'http://...:8080/api/v1/users/forgot-password/' + email;
  const res = await axios
    .post(url, {
      email: email,
    })
    .catch((err) => {
      console.log('Post operation for forgot-password failed. ' + err);
      throw err;
    });

  return res.data;
}

export default forgotPassword;
