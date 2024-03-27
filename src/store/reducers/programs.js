import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "../../axios";

//запрос на получение программ
export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {    //асинхронный запрос статей с названием news/fetchNews
    const { data } = await axiosBase.get('/programs'); //axiosBase - это урл базовый с портом 5000, вытаскиваем только data через деструктуризацию
    //console.log("Ответ от свервера новости", data);
    return data;
})

export const fetchRemoveProgram = createAsyncThunk('program/fetchRemoveProgram', async (id) => {    
    axiosBase.delete(`/program/${id}`); 
})

const initialState = {
    programs: {
        items: [],
        status: 'loading',
    },
}

const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {},
    extraReducers: {
        //удаление программы
        [fetchRemoveProgram.pending]: (state, action) => {          //данные загружаются (поэтому массив со статьями очищаем в момент запроса и ожидания ответа)
            state.programs.items = state.programs.items.filter(obj => obj._id !== action.meta.arg); //ищем статью по id и удаляем
        },
        //по хорошему добавить, если все прошло успешно alert (статья удалена)
        //при ошибке удаления вывести тоже alert
        //получение статей
        [fetchPrograms.pending]: (state) => {          //данные загружаются (поэтому массив со статьями очищаем в момент запроса и ожидания ответа)
            state.programs.items = [];
            state.programs.status = 'loading';
        },
        [fetchPrograms.fulfilled]: (state, action) => { //данные загрузились (вытаскиваем их из payload)
            state.programs.items = action.payload;
            state.programs.status = 'loaded';
        },
        [fetchPrograms.rejected]: (state, action) => {
            state.programs.items = [];
            state.programs.status = 'error';
            state.error = action.error.message; // Записываем сообщение об ошибке в состояние Redux
        } 
    }
});

export default programsSlice.reducer;