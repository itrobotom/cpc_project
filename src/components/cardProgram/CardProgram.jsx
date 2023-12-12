import { Card, CardMedia,  CardActionArea, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { Link } from "react-router-dom";
import { React, useState } from "react";
import './CardProgram.css'; 

import { addFavorite, removeFavorite } from "../../store/reducers/FavoriteProgramsSlice"
import {useDispatch, useSelector} from "react-redux"; 

//карточка добавляется и удаляется как в сторе, так и в localstorage

function CardProgram({program, isFavoriteCardDefault}) {
    
    const dispatch = useDispatch();
    const idCard = program.id; 
    //console.log('Внутри карты избранное', isFavoriteCardDefault);
    const [isFavoriteCard, setIsFavoriteCard] = useState(isFavoriteCardDefault);
    const handleFavoriteBtn = () => {
        //console.log(localStorage.getItem(idCard));
        if(localStorage.getItem(idCard) !== null) { //если карточка в избранном удаляем, иначе добавляем в ls
            localStorage.removeItem(idCard);
            setIsFavoriteCard(!isFavoriteCard);
            dispatch(removeFavorite(idCard));
        } else {
            localStorage.setItem(idCard, idCard);
            setIsFavoriteCard(!isFavoriteCard);
            dispatch(addFavorite(idCard));
        }
    }

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