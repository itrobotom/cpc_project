import { createSlice } from "@reduxjs/toolkit";
import programsData from '../../data/programs-data.json';

function getInitialFavoritePrograms() {
    let arrIdFavoritePrograms=[];
    programsData.map((program) => {
        if (localStorage.getItem(program.id) !== null){
            arrIdFavoritePrograms.push(program.id);
        }
    });
    console.log('Массив id избранных фильмов: ', arrIdFavoritePrograms);
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
        }
    }
})

export default favoriteProgramsSlice.reducer; 

export const { addFavorite, removeFavorite } = favoriteProgramsSlice.actions;
