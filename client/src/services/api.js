import axios from "axios";

// Automatically detects if you are running locally or live
const isLocal = import.meta.env.MODE === "development";

const API = axios.create({
    baseURL: isLocal 
        ? "http://localhost:5000/api"                 
        : "https://chat-app-backend-bw57.onrender.com/api" 
});

export default API;