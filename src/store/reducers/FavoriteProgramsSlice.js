import { createSlice } from "@reduxjs/toolkit";
import programsData from '../../data/programs-data.json';

function getInitialFavoritePrograms() {
    let arrIdFavoritePrograms=[];
    programsData.map((program) => {
        if (localStorage.getItem(program.id) !== null){
            arrIdFavoritePrograms.push(program.id);
        }
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
        // addFavoriteProgram(state, action){
        //     // Проверим, не добавлен ли уже этот ID в массив (при повтороном рендеринге 3 раза добавляет новый элемент)
        //     if (!state.arrFavoritePrograms.includes(action.payload)) {
        //         // Создаем объект программы с ID и добавляем его в массив
        //         state.arrFavoritePrograms.concat(action.payload);
        //     }
        // },
        // removeFavoriteProgram(state, action){
        //     state.arrFavoritePrograms = state.arrFavoritePrograms.filter((elem) => (elem !== action.payload));
        // }
    }
})

export default favoriteProgramsSlice.reducer; 

export const { addFavorite, removeFavorite } = favoriteProgramsSlice.actions;
