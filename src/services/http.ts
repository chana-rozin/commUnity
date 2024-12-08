import axios from "axios";

const http = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});

export default http;