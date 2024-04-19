import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://ticketbookingsystem-4fpa.onrender.com/api/v1",

    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

axiosInstance.defaults.withCredentials = true

export default axiosInstance;