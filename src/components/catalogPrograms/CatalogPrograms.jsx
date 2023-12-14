import React, { useEffect, useState } from 'react';
import programsData from '../../data/programs-data.json';
import { Box, Typography } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram"
import { useSelector, useDispatch } from "react-redux";
import { setTypeProgram, setTypeKlimovProgram } from "../../store/reducers/FilterPanelSlice"

const selectTypeProgramDefault = ["технические направления и инженерия", 
                                  "гуманитарные и социальные",
                                  "естественно-научные", 
                                  "искусство и дизайн", 
                                  "экономика и бизнес", 
                                  "патриотические", 
                                  "иностранные языки", 
                                  "экология и окружающая среда",
                                  "программирование"];
const selectTypeKlkimovProgramDefault = ["человек-природа",
                                        "Человек-техника", 
                                        "Человек-человек", 
                                        "Человек-знаковая система", 
                                        "Человек-художественный образ"];
const NUM_TYPES = selectTypeProgramDefault.length;
const NUM_TYPES_KLIMOV = selectTypeKlkimovProgramDefault.length;
const CatalogPrograms = () => {

    const ageIntervalSlider = useSelector(state => state.valueFilters.ageRange);
    const inputName = useSelector(state => state.valueFilters.nameProgram);
    const typesProgramStore = useSelector(state => state.valueFilters.type);
    const typePay = useSelector(state => state.valueFilters.fundingType);
    const isPassedTestKlimov = useSelector(state => state.valueFilters.isPassedTestKlimov);
    const selectTypeKlimov = useSelector(state => state.valueFilters.typeKlimov); 
    const dispatch = useDispatch();
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    
    //выбираем программы по фильтрам
    const catalogProgramListFilter = programsData.filter((program) => {
        //проверяем, чтобы хотя бы одна одна из точек экстремума слайдера лежала внутри интервала для программы
        //или наоборот, проверяем, чтобы хотя бы одна из крайних границ программы лежит внутри границ слайдера
        const includedInRange = ((ageIntervalSlider.min >= program.ageRange.min) && (ageIntervalSlider.min <= program.ageRange.max))
                                || ((ageIntervalSlider.max >= program.ageRange.min) && (ageIntervalSlider.max <= program.ageRange.max)) 
                                || ((program.ageRange.min >= ageIntervalSlider.min) && (program.ageRange.min <= ageIntervalSlider.max)) 
                                || ((program.ageRange.max >= ageIntervalSlider.min) && (program.ageRange.max <= ageIntervalSlider.max));

        //добавим фильтр по отбору по имени
        const includedSearchName =  program.title.toLowerCase().includes(inputName);

        //фильтр по типу финансирования: payType - платная, noPayType-не платная, allPayType - платная и не платная 
        let sortTypePay = true; //по умолчанию allPayType
        ((typePay === "noPayType") === program.budgetProgram) ? sortTypePay = true :  sortTypePay = false; //выбран тип не платные и он совпадает с пунктом budgetProgram в самой программе тогда true
        if (typePay === "allPayType"){
            sortTypePay = true; 
        }

        //сбрасываем в дефолт (на все типы) при переключении флажка (Климов/обычные типы), иначе фильтроваться будет по обоим типам фильтра
        isPassedTestKlimov ? dispatch(setTypeProgram(selectTypeProgramDefault)) : dispatch(setTypeKlimovProgram(selectTypeKlkimovProgramDefault)); 
        
        let includedType = true; //тип в фильтре выбран по умолчанию
        if(typesProgramStore.length < NUM_TYPES) { //если длина массива NUM_TYPES - 9, то каждая программа попадет в отображаение, как буд-то выбраны все типы, но как только мы выберем нужные пункты, нужно отфильтровать по критерию
            for (let i = 0; i < program.type.length; i++) { //переберем все типы для программы (отмеченные внутри самой программы автором)
                //console.log(count)
                includedType = typesProgramStore.some(item => item === program.type[i]);
                if (includedType){
                    break; //прерываем for как только встретили попавшийся тип, иначе если поседний не встретится, то программа не найдется
                }
                //console.log("найден тип программы", includedType);
            }
        } else {
            includedType = true; 
        }

        let includedTypeKlimov = true; //тип в фильтре выбран по умолчанию
        if(selectTypeKlimov.length < NUM_TYPES_KLIMOV) { //если длина массива 9, то каждая программа попадет в отображаение, как буд-то выбраны все типы, но как только мы выберем нужные пункты, нужно отфильтровать по критерию
            for (let i = 0; i < program.type.length; i++) { //переберем все типы для программы (отмеченные внутри самой программы автором)
                includedTypeKlimov = selectTypeKlimov.some(item => item === program.typeKlimov[i]);
                if (includedTypeKlimov){
                    break; //прерываем for как только встретили попавшийся тип, иначе если поседний не встретится, то программа не найдется
                }
                //console.log("найден тип программы", includedTypeKlimov);
            }
        } else {
            includedTypeKlimov = true; 
        }

        if (includedInRange && includedSearchName && includedType && sortTypePay && includedTypeKlimov){ 
            return program;
        }
    });
    
    const catalogProgramList = catalogProgramListFilter.map((program) => {
        const isFavoriteCardDefault = (arrFavoriteProgramsId.includes(program.id));  
        return (
            <div key={program.id}>
                <CardProgram program={program} isFavoriteCardDefault={isFavoriteCardDefault}/>
            </div>
        )
    });

    return (catalogProgramListFilter.length > 0 ? (
        <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignContent: "flex-start",
            // расстояние между карточками
            // gap: "0rem", 
            // расстояние для пространства блока с фильтрами
            pl: "23.5rem",
            "@media(max-width: 50rem)": {
            p: "0rem",
            },
        }}
        >
            {catalogProgramList}
        </Box>
    ) : (
        <Box>
            <Typography
                sx={{
                    m: "0rem 0rem 1rem 26.5rem",
                    color: "grey",
                    fontSize: "1.15rem",
                    "@media(max-width: 50rem)": {
                        ml: "0rem",
                    },
                }}
            >
                <i>Программы по заданным параметрам поиска отсутсвуют</i>
            </Typography>
        </Box>
        )
    )
}

export { CatalogPrograms }
