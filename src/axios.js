import axios from "axios";
import _ from "lodash";
//import config from "./config";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // withCredentials: true,
});

instance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  {
    const { data } = response;

    return response.data;
  }
});
export default instance;
