import React, { useEffect } from 'react';
import programsData from '../../data/programs-data.json';
import { Box, Typography } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram"
import { useSelector, useDispatch } from "react-redux";

const CatalogPrograms = () => {

    const ageIntervalSlider = useSelector(state => state.valueFilters.ageRange);
    //console.log('из каталога программ', ageIntervalSlider);
    const inputName = useSelector(state => state.valueFilters.nameProgram);
    
    const catalogProgramListFilter = programsData.filter((program) => {
        //проверяем, чтобы хотя бы одна одна из точек экстремума слайдера лежала внутри интервала для программы
        //или наоборот, проверяем, чтобы хотя бы одна из крайних границ программы лежит внутри границ слайдера
        const includedInRange = ((ageIntervalSlider.min >= program.ageRange.min) && (ageIntervalSlider.min <= program.ageRange.max))
                                || ((ageIntervalSlider.max >= program.ageRange.min) && (ageIntervalSlider.max <= program.ageRange.max)) 
                                || ((program.ageRange.min >= ageIntervalSlider.min) && (program.ageRange.min <= ageIntervalSlider.max)) 
                                || ((program.ageRange.max >= ageIntervalSlider.min) && (program.ageRange.max <= ageIntervalSlider.max));

        //добавим фильтр по отбору по имени
        const includedSearchName =  program.title.toLowerCase().includes(inputName);

        if (includedInRange && includedSearchName){ 
            return program;
        }
    });
    useEffect(() => {
        console.log('из юсэффекта каталога программ', ageIntervalSlider);
        console.log('из юсэффекта название программы', inputName);
    }, [ageIntervalSlider, inputName])

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
