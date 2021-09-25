import axios from "axios";

type getHealth = () => string;

async function getHealth () {
  return await axios.get("https://pawsup-dev-oznda.ondigitalocean.app/health").then(resp => resp.data);
}

async function addItem () {
  return await axios.post("https://pawsup-dev-oznda.ondigitalocean.app/create").then(resp => resp.data.message);
}

export {getHealth, addItem}