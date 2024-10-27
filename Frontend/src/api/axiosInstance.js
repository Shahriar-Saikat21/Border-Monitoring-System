import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true, 
});
  
export default axiosInstance;
