import { Card, CardMedia,  CardActionArea, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { Link } from "react-router-dom";
import { React, useState } from "react";
import './CardProgram.css'; 

function CardProgram({program}) {
    const idCard = program.id; 
    const favoriteFilmFlag = true; 
    console.log(program.posterPath);
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
                        // onClick={handleFavoriteBtn}     
                    >
                        {/* <FavoriteIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/> */}
                        {favoriteFilmFlag ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}

                    </IconButton>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export { CardProgram }