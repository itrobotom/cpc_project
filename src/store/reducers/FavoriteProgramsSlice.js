import { createSlice } from "@reduxjs/toolkit";

function getInitialFavoritePrograms() {
    let arrIdFavoritePrograms=[];
    const keysFavoritesCard = Object.keys(localStorage);
    // заносим их в редакс при обновлении страницы чтобы далее работать с ними
    keysFavoritesCard.forEach((key) =>{
        arrIdFavoritePrograms.push(key);
    });
    console.log('Массив id избранных программ: ', arrIdFavoritePrograms);
    return arrIdFavoritePrograms;
}

const favoriteProgramsSlice = createSlice({
    name: 'favoritePrograms',
    initialState: {
        arrIdFavoritePrograms: getInitialFavoritePrograms(),
    },
    reducers: {
        addFavorite(state, action) {
            state.arrIdFavoritePrograms.push(action.payload); //id получаем из payload
        },
        removeFavorite(state, action) {
            const index = state.arrIdFavoritePrograms.indexOf(action.payload);
            if (index !== -1) {
                state.arrIdFavoritePrograms.splice(index, 1); 
            }
        },
    }
})

export default favoriteProgramsSlice.reducer; 

export const { addFavorite, removeFavorite } = favoriteProgramsSlice.actions;
