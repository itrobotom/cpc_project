import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "../../axios";

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {    //асинхронный запрос статей с названием news/fetchNews
    const { data } = await axiosBase.get('/news'); //axiosBase - это урл базовый с портом 5000, вытаскиваем только data через деструктуризацию
    console.log("Ответ от свервера новости", data);
    return data;
    // axiosBase.get('/news')
    // .then(response => {
    //   // Обработка успешного ответа
    //   console.log('Получили успешный ответ', response.data);
    // })
    // .catch(error => {
    //   // Обработка ошибки
    //   console.log('Ошибка получения ответа с сервера:')
    //   console.error('Error fetching news:', error);
    // });
})
const initialState = {
    news: {
        items: [],
        status: 'loading',
    },
    // tags: {
    //     items: [],
    //     status: 'loading',
    // },
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNews.pending]: (state) => {          //данные загружаются (поэтому массив со статьями очищаем в момент запроса и ожидания ответа)
            state.news.items = [];
            state.news.status = 'loading';
        },
        [fetchNews.fulfilled]: (state, action) => { //данные загрузились (вытаскиваем их из payload)
            state.news.items = action.payload;
            state.news.status = 'loaded';
        },
        [fetchNews.rejected]: (state) => {          //при ошибке данные очищаются 
            state.news.items = [];
            state.news.status = 'error';
        },
    }
});

export default newsSlice.reducer;