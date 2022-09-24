import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000,
});

export default apiInstance;
