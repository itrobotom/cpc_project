import { createSlice } from "@reduxjs/toolkit";

const INIT_FILTER_STATE = {
    nameProgram: "",
    ageRange: { "min": 6, "max": 18 },
    isPassedTestKlimov: false,
    type: ["технические направления и инженерия", 
            "гуманитарные и социальные",
            "естественно-научные", 
            "искусство и дизайн", 
            "экономика и бизнес", 
            "патриотические", 
            "иностранные языки", 
            "экология и окружающая среда",
            "программирование"],
    typeKlimov: ["Человек-природа",
                "Человек-техника", 
                "Человек-человек", 
                "Человек-знаковая система", 
                "Человек-художественный образ"],
    isOnlyBudgetPrograms: false,
}

//сбросить фильтры, то есть поставить все в init_filter_state

//установить год обучения программ

const valueFilterSlice = createSlice({
    name: 'setFilter',
    initialState: INIT_FILTER_STATE,
    reducers: {
        resetFilter() {
            return INIT_FILTER_STATE;
        },
        setAge(state, action) {
            state.ageRange.min = action.payload[0];
            state.ageRange.max = action.payload[1];
        },
        inputName(state, action) {
            state.nameProgram = action.payload;
        },
        setTestKlimov(state, action) {
            state.isPassedTestKlimov = action.payload;
        }
    }
})

//изменить флаг показать бюджетные программы

//изменить флаг прохождения программ

//установка типов программ и рендер по этим типам

export { INIT_FILTER_STATE }
export const { resetFilter, setAge, inputName, setTestKlimov } = valueFilterSlice.actions;
export default valueFilterSlice.reducer 
