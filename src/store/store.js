import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteProgramsSlice from "./reducers/FavoriteProgramsSlice";
import valueFilterSlice from "./reducers/FilterPanelSlice";
import newsFilterSlice from "./reducers/FilterNewsPanelSlice";
import newsSlice from "./reducers/news";
import authSlice from "./reducers/auth";
import programsSlice from "./reducers/programs"


const rootReducer = combineReducers({
    favoritePrograms: favoriteProgramsSlice, 
    valueFilters: valueFilterSlice,
    valueFiltersNews: newsFilterSlice,
    news: newsSlice,
    programs: programsSlice,
    auth: authSlice,
});
export const store = configureStore({
    reducer: rootReducer,
    //классические инструменты разработчика
    //и redux thunk уже встроены в rtk, и нам не надо
    //их подключать что экономит время
})