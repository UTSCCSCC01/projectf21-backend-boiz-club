import axios from 'axios';

// type signup = (email: string, password: string) => string;

async function signup(email: string, username: string, password: string) {
  await axios
    .post('https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/register', {
      email: email,
      username: username,
      password: password,
    })
    .catch((err) => {
      console.log('Post operation for Sign-Up failed.' + err);
      throw err;
    });
}

export default signup;
