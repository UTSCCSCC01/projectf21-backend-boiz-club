import axios from 'axios';

// type login = (email: string, password: string) => string;

async function login(email: string, password: string) {
  const res = await axios
    .post('https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/login', {
      email: email,
      password: password,
    })
    .catch((err) => {
      console.log('Post operation for login failed. ' + err);
      throw err;
    });

  return res.headers['auth-tken'];
}

export { login };
