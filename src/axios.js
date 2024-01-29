import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'http://localhost:5000'
});

axiosBase.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})


export default axiosBase;

