import axios from 'axios';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

type getHealth = () => string;

async function getHealth() {
  return await axios
    .get(`${BACKEND_ENDPOINT}/health`)
    .then((resp) => resp.data.message);
}

export { getHealth };
