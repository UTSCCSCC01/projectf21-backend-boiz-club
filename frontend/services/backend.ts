import axios from "axios";

type getHealth = () => string;

async function getHealth () {
  return await axios.get("https://pawsup-dev-oznda.ondigitalocean.app/health").then(resp => resp.data);
}

export default getHealth;