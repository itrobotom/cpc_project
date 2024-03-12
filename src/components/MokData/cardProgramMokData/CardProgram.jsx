import { Card, CardMedia,  CardActionArea, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import './CardProgram.css'; 

import { addFavorite, removeFavorite } from "../../store/reducers/FavoriteProgramsSlice"
import { useDispatch, useSelector } from "react-redux"; 

//карточка добавляется и удаляется как в сторе, так и в localstorage, чтобы отобразить изменения иконки избранного в обоих компоненетах

function CardProgram({program, isFavoriteCardDefault}) {
    
    const dispatch = useDispatch();
    const idCard = program.id; 
    //console.log('Внутри карты избранное', isFavoriteCardDefault);
    const [isFavoriteCard, setIsFavoriteCard] = useState(isFavoriteCardDefault); //состояние избранного при первоначальном рендере isFavoriteCardDefault
    //console.log(`Карточка ${idCard} поменяла состояния избранности: `, isFavoriteCard)
    const handleFavoriteBtn = () => {
        //console.log(localStorage.getItem(idCard));
        if(localStorage.getItem(idCard) !== null) { //если карточка в избранном удаляем, иначе добавляем в ls
            dispatch(removeFavorite(idCard));
            localStorage.removeItem(idCard);
            setIsFavoriteCard(!isFavoriteCard);
        } else {
            dispatch(addFavorite(idCard));
            localStorage.setItem(idCard, idCard);
            setIsFavoriteCard(!isFavoriteCard);   
        }
    }
    
    useEffect(() => { //ОБНОВЛЯЕМ ЛОКАЛЬНОЕ СОСТОЯНИЕ ИЗБРАННОГО ПРИ ЕГО СМЕНЕ (БЫЛА ПРОБЛЕМА, ПРИ КЛИКЕ ИКОНКИ КАРТОЧКА ИЗ ИЗБРАННЫХ УДАЛЯЛАСЬ, А НЕ ПЕРЕРИСОВЫВАЛАСЬ ИКОНКА В ОБЩЕМ СПИСКЕ ПРОГРАММ И ЗНАЧЕК ИЗБРАННОГО ОСТАВАЛСЯ)
        setIsFavoriteCard(isFavoriteCardDefault);
    }, [isFavoriteCardDefault]);

    return (
        <Card className="custom-card" sx = {{ width: 340, height: 560, mr: '20px', mb: '20px' }}>
            <CardActionArea className="card-action-area">
                <Link
                    to={`description_programm/${idCard}`}
                >
                    <CardMedia
                        component="img"
                        //height="140" //можно изменить высоту отображения изображения карточки, но тогда она будет урезана
                        image = { program.posterPath }
                        alt="img_program"
                    />
                </Link>
                
                <Box
                    sx={{width: '100%', display: 'flex', justifyContent: 'space-between', m: 2}}
                >
                    <Box mt='5px'>
                        <Typography color="#000000" variant="h6" gutterBottom>{program.title}</Typography>
                        {/* <Typography color="lightgray" variant="h7">{movie.vote_average}</Typography> */}
                    </Box>
                    <IconButton aria-label="add"
                        sx = {{ mt: 0, mr: 3 }}
                        onClick={handleFavoriteBtn}     
                    >
                        {/* <FavoriteIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/> */}
                        {isFavoriteCard ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}

                    </IconButton>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export { CardProgram }