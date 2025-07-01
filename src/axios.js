import axios from 'axios';

//для сетевого запроса
const axiosBase = axios.create({
    baseURL: 'https://api.info.cpc.tomsk.ru', // Базовый URL для вашего бэкенда
});

//для локального запроса
// const axiosBase = axios.create({
//     baseURL: 'http://localhost:5000'
// });

// Для того чтобы axios автоматически отправлял токен, который хранится в localStorage, нужно использовать интерцепторы (interceptors). Интерцепторы позволяют вам модифицировать запросы или ответы до того, как они будут обработаны. В данном случае можно настроить интерцептор для добавления токена в заголовки всех запросов.
axiosBase.interceptors.request.use((config) => { //
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})


export default axiosBase;

