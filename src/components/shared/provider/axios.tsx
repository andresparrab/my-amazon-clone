import Axios from "axios";

const instance = Axios.create({
  // baseURL: "http://localhost:5001/challange-2befc/us-central1/api",
  baseURL: "https://us-central1-challange-2befc.cloudfunctions.net/api",
});

export default instance;
