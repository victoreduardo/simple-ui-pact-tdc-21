import axios from "axios";

const config = {
    baseURL: "http://127.0.0.1:3003/",
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

const api = axios.create(config);

export default api;
