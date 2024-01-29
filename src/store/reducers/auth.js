import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "../../axios";

export const fetchGetToken = createAsyncThunk('auth/fetchGetToken', async (params) => {    //асинхронный запрос с параметрами params для проверки авторизации 
    const { data } = await axiosBase.post('/auth/login', params); //axiosBase - это урл базовый с портом 5000, вытаскиваем только data через деструктуризацию
    console.log("Ответ от свервера авторизация ", data);
    return data;
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {    
    const { data } = await axiosBase.get('/auth/me'); //не нужен POST запрос, axios сам автоматически в теле запроса передает токен, а не в параметрах запроса
    console.log("Ответ от свервера авторизация ", data);
    return data;
})

const initialState = {
    data: null, //информация об авторизации 
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchGetToken.pending]: (state) => {          //данные загружаются и данные для авторизации пока пустые (будет токен, который нам прийдет)
            state.data = null;
            state.status = 'loading';
        },
        [fetchGetToken.fulfilled]: (state, action) => { //данные загрузились (вытаскиваем токен из payload)
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchGetToken.rejected]: (state) => {          //при ошибке данные очищаются 
            state.data = null;
            state.status = 'error';
        },
        // тоже замое и при запросе информации о пользователе
        [fetchLogin.pending]: (state) => {          //данные загружаются и данные для авторизации пока пустые (будет токен, который нам прийдет)
            state.data = null;
            state.status = 'loading';
        },
        [fetchLogin.fulfilled]: (state, action) => { //данные загрузились (вытаскиваем токен из payload)
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchLogin.rejected]: (state) => {          //при ошибке данные очищаются 
            state.data = null;
            state.status = 'error';
        },
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;