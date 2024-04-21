import axios from "axios";
import { Route, useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",

    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }    
});


axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        window.location.href = "/login";
      }
      return error;
    });

export default axiosInstance;