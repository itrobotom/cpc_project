import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteProgramsSlice from "./reducers/FavoriteProgramsSlice";
import valueFilterSlice from "./reducers/FilterPanelSlice";
import newsFilterSlice from "./reducers/FilterNewsPanelSlice";
import { newsReducer } from "./reducers/news";


const rootReducer = combineReducers({
    favoritePrograms: favoriteProgramsSlice, 
    valueFilters: valueFilterSlice,
    valueFiltersNews: newsFilterSlice,
    news: newsReducer,
});
export const store = configureStore({
    reducer: rootReducer,
    //классические инструменты разработчика
    //и redux thunk уже встроены в rtk, и нам не надо
    //их подключать что экономит время
})