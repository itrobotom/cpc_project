import { createSlice } from "@reduxjs/toolkit";

const selectTypeNewsDefault = ["технические направления и инженерия", 
                                    "гуманитарные и социальные",
                                    "естественно-научные", 
                                    "искусство и дизайн", 
                                    "экономика и бизнес", 
                                    "патриотические", 
                                    "иностранные языки", 
                                    "экология и окружающая среда",
                                    "программирование"];

const INIT_FILTER_STATE = {
    nameNews: "",
    yearRange: { "min": 2000, "max": 2024 },
    type: selectTypeNewsDefault,
}

const newsFilterSlice = createSlice({
    name: 'setFilterNews',
    initialState: INIT_FILTER_STATE,
    reducers: {
        resetFilter() {
            return { ...INIT_FILTER_STATE };
        },  
        setYear(state, action) {
            state.yearRange.min = action.payload[0];
            state.yearRange.max = action.payload[1];
        },
        setInputName(state, action) {
            state.nameNews = action.payload;
        },
        setTypeNews(state, action) {
            state.type = action.payload;
        },
        cleanTypeNews(state) {
            state.type = [];
        }
    }
})

export { INIT_FILTER_STATE }
export const { resetFilter, setYear, setInputName, setTypeNews, cleanTypeNews } = newsFilterSlice.actions;
export default newsFilterSlice.reducer 
