import axios from 'axios';

const api = axios.create({
    baseURL: 'https://spring-78fn.onrender.com'
});

export default api;