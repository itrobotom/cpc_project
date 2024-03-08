// import { useDispatch, useSelector } from 'react-redux'; 
// import { fetchNews } from "../../store/reducers/news.js";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

import { useMediaQuery } from '@mui/material';
import { Box, Typography, IconButton, CardMedia, Link, Stack, LinearProgress } from "@mui/material";
import "../detailsProgram/DetailsProgram.css"

import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { ImageSlider } from '../imageSlider/ImageSlider';

import axiosBase from '../../axios';


export function DetailsProgram() {
    const [dataProgram, setDataProgram] = useState({});
    const [isLoading, setIsLoading] = useState(true); //считаем изначально, что данные загружаются, если false, то загружены
    const { programm_id } = useParams(); 
    //console.log("Вот id открытой программы", programm_id); 
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth); // Данные пользователя (для проверки авторизации)
    
    useEffect(() => {
        // Запрашиваем нужную программу по id
        axiosBase
            .get(`/programs/${programm_id}`)
            .then((res) => {
                setDataProgram(res.data);
                setIsLoading(false); //статус данные загружены
                console.log("Пришло с сервера по одной программе ", res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Ошибка при получении статьи");
            })
    }, []); // Запускаем запрос при изменении статуса аутентификации
    
    
    const isWideScreen = useMediaQuery('(min-width:960px)');
    
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    const isFavoriteCardDefault = (arrFavoriteProgramsId.includes(dataProgram._id));
    return(
        <>
            {isLoading ? ( //грузим карточки только тогда, когда пришел ответ от сервера, а до - индикатор прогресса
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
                    <Box
                        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column', lg: 'row' }}} 
                    >
                        {/* <Box
                            sx={{
                                position: isWideScreen ? 'fixed' : 'static',
                                //width: "20rem",
                                "@media(max-width: 50rem)": {
                                position: "static",
                                },
                                //pl: "1rem",
                                backgroundColor: 'white',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                width: { xs: '100%', md: '420px' }, // Замените этот размер на желаемый
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '100%', //вытягивает белый фон 
                            }}
                        > */}
                            {/* <Box ml='10px' mt='10px' sx={{ display: 'flex'}}>
                                <Typography 
                                    ml='20px' color="#000000" variant="h4" gutterBottom
                                >
                                    {`${dataProgram.titleProgram}`}
                                </Typography>
                                <IconButton aria-label="add" 
                                    sx = {{ mb: 2, mr: 3 }}
                                    // onClick={handleFavoriteBtn}
                                >
                                    { isFavoriteCardDefault ? <ThumbUpIcon /> : <ThumbUpOffAltIcon /> }
                                </IconButton>
                            </Box> */}
                            {/* <CardMedia
                                component="img"
                                sx={{ width: 350, height: 520, textAlign: "center", mb: "30px"}}
                                image = { `http://localhost:5000${dataProgram.imageUrl}` }
                                alt="img_program"
                            />
                            
                        </Box> */}
                        
                        {/* <Box ml={isWideScreen ? '420px' : '0px'}  */}
                        {/* <Box ml={isWideScreen ? '80px' : '0px'} 
                            mt='10px' 
                            pl='10px'
                        > */}
                        <Box 
                            ml='auto' 
                            mr='auto'
                            // pl='10px'
                            sx = {{ pt: 0, width: "85%", overflow: 'auto'}}
                        >
                            
                            <Box >
                                
                                <Box
                                    sx={{ display: 'flex'}} 
                                >
                                    <IconButton  
                                    sx = {{ mb: 2, mr: 0 }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography 
                                        ml='0px' color="#000000" variant="h4" gutterBottom
                                        sx = {{ pt: 0 }}
                                    >
                                        {dataProgram.titleProgram}
                                    </Typography>
                                    <IconButton aria-label="add" 
                                        sx = {{ mb: 2, mr: 3 }}
                                        // onClick={handleFavoriteBtn}
                                    >
                                        { isFavoriteCardDefault ? <ThumbUpIcon /> : <ThumbUpOffAltIcon /> }
                                    </IconButton>
                                </Box>
                                
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'column', lg: 'row' },
                                    }}
                                    >
                                    <Typography
                                        ml='0px'
                                        sx={{
                                        pt: 1,
                                        pl: 2, 
                                        width: { xs: '100%', md: '100%', lg: '50%' },
                                        fontSize: '18px',
                                        textAlign: 'justify',
                                        }}
                                    >
                                        {dataProgram.textProgram}
                                    </Typography>
                                    <Box sx={{width: { xs: '100%', md: '100%', lg: '50%' } }}>
                                        <ImageSlider arr_img_url={dataProgram.arrLinkImg} />
                                    </Box>
                                    
                                </Box>


                                <TableContainer component={Paper} style={{ boxShadow: 'none', border: 'none', width: '100%'}}>
                                    <Table style={{ borderCollapse: 'collapse', backgroundColor: 'transparent' }}>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Вид услуги:</TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }} >бюджетная программа</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Возраст:</TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{`${dataProgram.ageRangeProgram[0]}-${dataProgram.ageRangeProgram[1]} лет`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Срок обучения:</TableCell>
                                            {/* <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{dataProgram}</TableCell> */}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Специализация:</TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{dataProgram.typesProgram}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Скачать программу: </TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                                <Link href={`http://localhost:5000${dataProgram.fileUrl}`} target="_blank" rel="noopener noreferrer">
                                                    текст программы
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        
                                                
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', verticalAlign: 'top', fontSize: '18px' }} >Подойдет ли программа ребенку?</TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                                <Link href="https://testometrika.com/business/test-to-determine-career/" target="_blank" rel="noopener noreferrer">
                                                Пройти тест 
                                                </Link> 
                                                {' '}Климова на профориентацию или{' '}
                                                <Link href="#" target="_blank" rel="noopener noreferrer">
                                                записаться 
                                                </Link> 
                                                {' '}на проф консультацию к специалистам нашего центра
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px', verticalAlign: 'top' }} >
                                            О том, чем занимаются дети рассказываем в социальных сетях. Как проходят занятия, участие в соревнованиях, конкурсах. Следите за нашими новостями!
                                            </TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                                <iframe
                                                    title="YouTube Video"
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/BkA5t2uvNRI"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                />
                                            </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell style={{ width: '30%', borderBottom: 'none', verticalAlign: 'top', fontSize: '18px' }} >Творечское объединение в социальных сетях:</TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                                <IconButton aria-label="vk">
                                                    <a href={dataProgram.linkGroup} target="_blank">
                                                        <FontAwesomeIcon icon={faVk} style={{ color: "#0077ff", fontSize: "40px", verticalAlign: 'middle' }} />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Педагоги: </TableCell>
                                            <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                                {dataProgram.instructors.map(element => (
                                                    <Box key={element.name}>
                                                        <Link href={element.link} target="_blank" rel="noopener noreferrer">
                                                            {element.name}
                                                        </Link> 
                                                    </Box>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}