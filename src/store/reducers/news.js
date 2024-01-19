import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    news: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducer: {},
});

export const newsReducer = newsSlice.reducer;