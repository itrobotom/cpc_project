import React, { useEffect } from 'react';
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
const selectTypeKlkimovProgramDefault = ["Человек-природа",
                                        "Человек-техника", 
                                        "Человек-человек", 
                                        "Человек-знаковая система", 
                                        "Человек-художественный образ"];
const CatalogPrograms = () => {

    const ageIntervalSlider = useSelector(state => state.valueFilters.ageRange);
    const inputName = useSelector(state => state.valueFilters.nameProgram);
    const typesProgramStore = useSelector(state => state.valueFilters.type);

    const dispatch = useDispatch();
    //dispatch(resetFilter()); 
    const isPassedTestKlimov = useSelector(state => state.valueFilters.isPassedTestKlimov);
    
    const catalogProgramListFilter = programsData.filter((program) => {
        //проверяем, чтобы хотя бы одна одна из точек экстремума слайдера лежала внутри интервала для программы
        //или наоборот, проверяем, чтобы хотя бы одна из крайних границ программы лежит внутри границ слайдера
        const includedInRange = ((ageIntervalSlider.min >= program.ageRange.min) && (ageIntervalSlider.min <= program.ageRange.max))
                                || ((ageIntervalSlider.max >= program.ageRange.min) && (ageIntervalSlider.max <= program.ageRange.max)) 
                                || ((program.ageRange.min >= ageIntervalSlider.min) && (program.ageRange.min <= ageIntervalSlider.max)) 
                                || ((program.ageRange.max >= ageIntervalSlider.min) && (program.ageRange.max <= ageIntervalSlider.max));

        //добавим фильтр по отбору по имени
        const includedSearchName =  program.title.toLowerCase().includes(inputName);

        let includedType = true; 

        //сбрасываем в дефолт (на все типы) при переключении флажка (Климов/обычные типы), иначе фильтроваться будет по обоим типам фильтра
        isPassedTestKlimov ? dispatch(setTypeProgram(selectTypeProgramDefault)) : dispatch(setTypeKlimovProgram(selectTypeKlkimovProgramDefault)); 

        if(typesProgramStore.length < 9) { //если длина массива 9, то каждая программа попадет в отображаение, как буд-то выбраны все типы, но как только мы выберем нужные пункты, нужно отфильтровать по критерию
            //const includedType = program.type;
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

        if (includedInRange && includedSearchName && includedType){ 
            return program;
        }
    });
    useEffect(() => {
        console.log('из юсэффекта каталога программ', ageIntervalSlider);
        console.log('из юсэффекта название программы', inputName);
    }, [ageIntervalSlider, inputName, typesProgramStore])

    //создаем новый массив программ, где будут отображаться программы с верной пометкой статуса избранных 
    const catalogProgramList = catalogProgramListFilter.map((program) => {
        const isFavoriteCardDefault = (localStorage.getItem(program.id) !== null);
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
