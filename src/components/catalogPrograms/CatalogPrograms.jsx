import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Stack, CircularProgress  } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram"
import { useSelector, useDispatch } from "react-redux";
import { setTypeProgram, setTypeKlimovProgram } from "../../store/reducers/FilterPanelSlice"
import { addFavorite } from "../../store/reducers/FavoriteProgramsSlice"

import { fetchPrograms } from '../../store/reducers/programs';

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
    const dispatch = useDispatch(); 
    
    //ВАРИАНТ ВРЕМЕННЫЙ ДЛЯ ПРОВЕРКИ БЕЗ AXIOS
    // const [programs, setPrograms] = useState([]);
    // useEffect(() => {
    //     async function fetchPrograms2() {
    //         try {
    //             const response = await fetch('https://info.cpc.tomsk.ru:5000/programs');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setPrograms(data);
    //             console.log("Все программы объектом", data);
    //         } catch (error) {
    //             console.error('Error fetching programs:', error);
    //         }
    //     }
    //     fetchPrograms2();
    // }, []); // Run only once on component mount
    // const isLoadingPrograms = true;
    
    useEffect(() => {
        dispatch(fetchPrograms());
    }, []); // Запускаем запрос при изменении статуса аутентификации
    const { programs } = useSelector((state) => state.programs); // Все программы объектом
    const isLoadingPrograms = programs.status === 'loading';

    console.log("Все программы ", programs);

    const ageIntervalSlider = useSelector(state => state.valueFilters.ageRange);
    const inputName = useSelector(state => state.valueFilters.nameProgram);
    const typesProgramStore = useSelector(state => state.valueFilters.type);
    const typePay = useSelector(state => state.valueFilters.fundingType);
    const isPassedTestKlimov = useSelector(state => state.valueFilters.isPassedTestKlimov);
    const selectTypeKlimov = useSelector(state => state.valueFilters.typeKlimov); 
    
    //подписываемся на список Id избранных карточек программ в сторе (благодаря этому происходит перерндер при изменении массива избранных стора)
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    //!!!!!В РЕДАКСЕ FavoriteProgramSlice.js есть получение id программы из localStorage как ранее сохраненные программы
    
    const { data } = useSelector((state) => state.auth); //данные пользователя

    let catalogProgramListFilter;
    let catalogProgramList; 
    
    //выбираем программы по фильтрам, когда загрузились с сервера
    if(!isLoadingPrograms){
        catalogProgramListFilter = programs.items.filter((program) => {
            console.log(program);
            // проверяем, чтобы хотя бы одна одна из точек экстремума слайдера лежала внутри интервала для программы
            // или наоборот, проверяем, чтобы хотя бы одна из крайних границ программы лежит внутри границ слайдера
            const includedInRange = ((ageIntervalSlider.min >= program.ageRangeProgram[0]) && (ageIntervalSlider.min <= program.ageRangeProgram[1]))
                                    || ((ageIntervalSlider.max >= program.ageRangeProgram[0]) && (ageIntervalSlider.max <= program.ageRangeProgram[1])) 
                                    || ((program.ageRangeProgram[0] >= ageIntervalSlider.min) && (program.ageRangeProgram[0] <= ageIntervalSlider.max)) 
                                    || ((program.ageRangeProgram[1] >= ageIntervalSlider.min) && (program.ageRangeProgram[1] <= ageIntervalSlider.max));
    
            //добавим фильтр по отбору по имени
            const includedSearchName =  program.titleProgram.toLowerCase().includes(inputName);
    
            //фильтр по типу финансирования: payType - платная, noPayType-не платная, allPayType - платная и не платная 
            let sortTypePay = true; //по умолчанию allPayType
            ((typePay === "noPayType") === program.isBudgetProgramm) ? sortTypePay = true :  sortTypePay = false; //выбран тип не платные и он совпадает с пунктом budgetProgram в самой программе тогда true
            if (typePay === "allPayType"){
                sortTypePay = true; 
            }
    
            //сбрасываем в дефолт (на все типы) при переключении флажка (Климов/обычные типы), иначе фильтроваться будет по обоим типам фильтра
            isPassedTestKlimov ? dispatch(setTypeProgram(selectTypeProgramDefault)) : dispatch(setTypeKlimovProgram(selectTypeKlkimovProgramDefault)); 
            
            let includedType = true; //тип в фильтре выбран по умолчанию
            if(typesProgramStore.length < NUM_TYPES) { //если длина массива NUM_TYPES - 9, то каждая программа попадет в отображаение, как буд-то выбраны все типы, но как только мы выберем нужные пункты, нужно отфильтровать по критерию
                for (let i = 0; i < program.typesProgram.length; i++) { //переберем все типы для программы (отмеченные внутри самой программы автором)
                    //console.log(count)
                    includedType = typesProgramStore.some(item => item === program.typesProgram[i]);
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
                for (let i = 0; i < program.typesProgramKlimov.length; i++) { //переберем все типы для программы (отмеченные внутри самой программы автором)
                    includedTypeKlimov = selectTypeKlimov.some(item => item === program.typesProgramKlimov[i]);
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
        catalogProgramList = catalogProgramListFilter.map((program) => {
            const isFavoriteCardDefault = (arrFavoriteProgramsId.includes(program._id));  
            //console.log(`Программа с id ${program._id} под названием ${program.titleProgram} находится в избранном `, isFavoriteCardDefault)
            return (
                <div key={program._id}>
                    <CardProgram 
                        program={program} 
                        isFavoriteCardDefault={isFavoriteCardDefault}
                        isEditable={data !== undefined && data !== null} // если данные есть, то авторизованы и значит можно удалять/редактировать
                    />
                </div>
            )
        });

    }
    return (
        <>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
                alignContent: "flex-start",
                // расстояние между карточками
                // gap: "0rem", 
                // расстояние для пространства блока с фильтрами
                pl: "26.5rem",
                "@media(max-width: 50rem)": {
                    p: "0rem",
                    ml: "2rem"
                },
            }}
        >
            {isLoadingPrograms ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh', // Задайте высоту вьюпорта
                        width: '100%',
                    }}
                >
                    {/* <CircularProgress color="success"/> */}
                    <Stack sx={{ width: '70%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress />
                    </Stack>
                </Box>
            ) : (
                <>
                {catalogProgramListFilter.length > 0 ? 
                    (catalogProgramList) :
                    (
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100vh', // Задайте высоту вьюпорта
                                width: '100%',
                                color: "grey",
                                fontSize: "1.15rem",
                            }}
                        >
                            Программы по заданным параметрам поиска отсутсвуют
                        </Typography>
                    )}
                </>
            )}
            </Box>
        </>
    )
}
  


export { CatalogPrograms }
