import axios from "axios";

const API = axios.create({
    baseURL : "https://chat-app-backend-bw57.onrender.com/api",
});

export default API;