import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'http://localhost:5000'
});

//axios.get('/news'); //полный url писать не надо, т.к. выше сделали базовый 

export default axiosBase;

