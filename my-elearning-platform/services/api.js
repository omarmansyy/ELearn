import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL of your NestJS backend
});

export default api;