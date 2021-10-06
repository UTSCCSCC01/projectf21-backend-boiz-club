import axios from 'axios';

// type forgotPassword = (email: string) => any;

async function forgotPassword(email: string) {
    const send = await axios
    .post('https://pawsup-dev-oznda.ondigitalocean.app/api/v1/forgot-password/{email}', {
        email: email,
    })
    .catch((err) => {
        console.log('Post operation for forgot password failed. ' + err);
        throw err;
    })
    .then((response) => {
        console.log(response.data);
        console.log("-----------");
        return response;
    });
}

export default forgotPassword;