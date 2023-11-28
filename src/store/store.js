import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteProgramsSlice from "./reducers/FavoriteProgramsSliceReducer";

const rootReducer = combineReducers({
    favoritePrograms: favoriteProgramsSlice, 
})
export const store = configureStore({
    reducer: rootReducer,
    //классические инструменты разработчика
    //и redux thunk уже встроены в rtk, и нам не надо
    //их подключать что экономит время
})