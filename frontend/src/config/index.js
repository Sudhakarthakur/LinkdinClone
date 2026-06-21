import axios from "axios";


export const BASE_URL = "http://localhost:9090";
const client = axios.create({
    baseURL: BASE_URL
})

export default client;