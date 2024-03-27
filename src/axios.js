import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'https://api.info.cpc.tomsk.ru', // Базовый URL для вашего бэкенда
});

// const axiosBase = axios.create({
//     baseURL: 'https://info.cpc.tomsk.ru:5000', // Базовый URL для вашего бэкенда
// });
// const axiosBase = axios.create({
//     baseURL: 'http://localhost:5000'
// });
// const axiosBase = axios.create({
//     baseURL: 'https://alexmywork.ru'
// });
// const axiosBase = axios.create({
//     baseURL: '/'
// });

axiosBase.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})


export default axiosBase;

