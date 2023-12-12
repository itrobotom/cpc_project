import { createSlice } from "@reduxjs/toolkit";

const selectTypeProgramDefault = ["технические направления и инженерия", 
                                    "гуманитарные и социальные",
                                    "естественно-научные", 
                                    "искусство и дизайн", 
                                    "экономика и бизнес", 
                                    "патриотические", 
                                    "иностранные языки", 
                                    "экология и окружающая среда",
                                    "программирование"];
const selectTypeKlkimovProgramDefault = ["Человек-природа",
                                        "Человек-техника", 
                                        "Человек-человек", 
                                        "Человек-знаковая система", 
                                        "Человек-художественный образ"];

const INIT_FILTER_STATE = {
    nameProgram: "",
    ageRange: { "min": 6, "max": 18 },
    isPassedTestKlimov: false,
    type: selectTypeProgramDefault,
    typeKlimov: selectTypeKlkimovProgramDefault,
    isOnlyBudgetPrograms: false,
}

const valueFilterSlice = createSlice({
    name: 'setFilter',
    initialState: INIT_FILTER_STATE,
    reducers: {
        resetFilter() {
            return { ...INIT_FILTER_STATE };
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
        },
        setTypeProgram(state, action) {
            return {
                ...state,
                type: action.payload,
            };
        },
        cleanTypeProgram(state) {
            return {
                ...state,
                type: [],
            };
        },
        setTypeKlimovProgram(state, action) {
            return {
                ...state,
                typeKlimov: action.payload,
            };
        },
        cleanTypeKlimovProgram(state) {
            return {
                ...state,
                typeKlimov: [],
            };
        }
    }
})

//изменить флаг показать бюджетные программы

//изменить флаг прохождения программ

//установка типов программ и рендер по этим типам

export { INIT_FILTER_STATE }
export const { resetFilter, setAge, inputName, setTestKlimov, setTypeProgram, cleanTypeProgram, setTypeKlimovProgram, cleanTypeKlimovProgram } = valueFilterSlice.actions;
export default valueFilterSlice.reducer 
