import { React } from "react";
import programsData from '../../data/programs-data.json';
import { Box, Typography } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram";
import { useSelector } from "react-redux"; 

const CatalogFavoritePrograms = () => {
    //подписываемся на список Id избранных карточек программ в сторе (благодаря этому происходит перерндер при изменении массива избранных стора)
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    
    // Фильтруем программы, чтобы получить только избранные
    const favoritePrograms = programsData.filter(program => localStorage.getItem(program.id) !== null);
    // Вычисляем количество избранных программ
    const countCardsFavorite = favoritePrograms.length;

    const catalogProgramListFavorite = favoritePrograms.map((program) => {
        return(
            <div key={program.id}>
                <CardProgram program={program} isFavoriteCardDefault={true} />
            </div>
        )
    });

    return (countCardsFavorite > 0 ? (
        <>
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
                    Подборка избранных программ
                </Typography>
            <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
                alignContent: "flex-start",
                pl: "23.5rem",
                "@media(max-width: 50rem)": {
                p: "0rem",
                },
            }}
            >
                
                {catalogProgramListFavorite}
            </Box>
        </>
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
                <i>Программы в избранном отсутсвуют</i>
            </Typography>
        </Box>
        )
    )
}

export { CatalogFavoritePrograms }
