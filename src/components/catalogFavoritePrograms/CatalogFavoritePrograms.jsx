import { React, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram";
import { useSelector, useDispatch } from "react-redux"; 
import { fetchPrograms } from "../../store/reducers/programs";

const CatalogFavoritePrograms = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth); // Данные пользователя (для проверки авторизации)
    const isAuth = (data !== undefined && data !== null); // флаг на авторизацию
    console.log("Админ авторизован ", isAuth);
    useEffect(() => {
        // Запрашиваем все программы из базы и передаем статус аутентификации
        dispatch(fetchPrograms(isAuth));
    }, [dispatch, isAuth]); // Запускаем запрос при изменении статуса аутентификации

    const { programs } = useSelector((state) => state.programs); // Все программы объектом
    const isLoadingPrograms = programs.status === 'loading';
    console.log("Все программы ", programs);


    //подписываемся на список Id избранных карточек программ в сторе (благодаря этому происходит перерндер при изменении массива избранных стора)
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    
    // Фильтруем программы, чтобы получить только избранные
    const favoritePrograms = programs.items.filter(program => localStorage.getItem(program._id) !== null);
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
                    pl: "26.5rem",
                    "@media(max-width: 50rem)": {
                        p: "0rem",
                        ml: "2rem"
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
