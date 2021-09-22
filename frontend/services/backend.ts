import axios from "axios";

type getHealth = () => JSON;

function getHealth () {
  const promise: Promise<any> = axios.get("http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1");

  return promise.then(resp => resp.data);
}

export default getHealth;