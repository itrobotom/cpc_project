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
import { useMediaQuery } from '@mui/material';
import "../detailsProgram/DetailsProgram.css"

import { React, useState, useEffect } from "react";
import { Box, Typography, IconButton, CardMedia, Link } from "@mui/material";

import { useParams } from 'react-router-dom';
import programsData from '../../data/programs-data.json';
import { ImageSlider } from '../imageSlider/ImageSlider';
import { useSelector } from "react-redux";

export function DetailsProgram() {
    //programm_id это как раз то, что передано в роуте 
    //после / - path: "description_programm/:programm_id",
    const { programm_id } = useParams(); 
    console.log("Вот id открытой программы", programm_id); 
    const program = programsData.find(program => program.id === parseInt(programm_id))
    console.log(program.posterPath);
    
    const isWideScreen = useMediaQuery('(min-width:960px)');

    //ссылки на фото сотрудников
    const imagePath1 = '/media/teachers/ivanov.PNG';
    const imagePath2 = '/media/teachers/chernych.PNG';

    const widthTable1 = 40;
    const widthTable2 = 40;
    
    const arrFavoriteProgramsId = useSelector(state => state.favoritePrograms.arrIdFavoritePrograms);
    const isFavoriteCardDefault = (arrFavoriteProgramsId.includes(program.id));
    return(
        <>
            {/* <Typography 
                // ml='0px' color="#000000" variant="h3" gutterBottom
            >
                {`${`Образовательная программа-${program.title}`})`}
            </Typography> */}
            <Box
                sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column', lg: 'row' }}} 
            >
                <Box
                    // sx={{
                    //     position: isWideScreen ? 'fixed' : 'static',
                    //     top: 0,
                    //     left: 0,
                    //     width: { xs: '100%', md: '370px' }, // Замените этот размер на желаемый
                    //     // width: '370px', // Замените этот размер на желаемый
                    //     height: '100vh', // Замените этот размер на желаемый
                    //     overflowY: 'auto',
                    //     display: 'flex',
                    //     flexDirection: 'column',
                    //     alignItems: 'center',
                    //     backgroundColor: 'white',
                    //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    //     zIndex: 1,
                    // }}
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
                >
                    <Box ml='10px' mt='10px' sx={{ display: 'flex'}}>
                        <Typography 
                            ml='20px' color="#000000" variant="h4" gutterBottom
                        >
                            {`${program.title}`}
                        </Typography>
                        <IconButton aria-label="add"  // НУЖНО УВЕЛИЧИТЬ ЗВЕЗДОЧКУ fontSize: "large" !!!!!!!!!!!!!!!!!!!!!!!
                            sx = {{ mb: 2, mr: 3 }}
                            // onClick={handleFavoriteBtn}
                        >
                            {/* <StarBorderIcon style={{ color: 'gray' }}/> */}
                            {/* <StarBorderIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/> */}
                            { isFavoriteCardDefault ? <ThumbUpIcon /> : <ThumbUpOffAltIcon /> }
                        </IconButton>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 350, height: 520, textAlign: "center", mb: "30px"}}
                        image = { `/${program.posterPath}` }
                        alt="img_program"
                    />
                    
                </Box>
                
                
                <Box ml={isWideScreen ? '420px' : '0px'} 
                    mt='10px' 
                    pl='10px'
                >
                    
                    <Box sx = {{ pt: 0, width: "95%", overflow: 'auto'}}>
                        
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
                                Детали программы 
                            </Typography>
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
                                {program.description}
                            </Typography>
                            <Box sx={{width: { xs: '100%', md: '100%', lg: '50%' } }}>
                                <ImageSlider programm_id={programm_id} />
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
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{`${program.ageRange.min}-${program.ageRange.max} лет`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Срок обучения:</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{program.duration}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Специализация:</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>{program.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Скачать программу: </TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                        <Link href="#" target="_blank" rel="noopener noreferrer">
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
                                {/* <Typography 
                                    ml='0px'
                                    sx = {{ pt: 1 }}
                                >
                                    О том, чем занимаются дети рассказываем в социальных сетях. Как проходят занятия, участие в соревнованиях, конкурсах. Следите за нашими новостями!
                                </Typography> */}
                                
                                {/* СДЕЛАТЬ КОГАД ЭКРАН МЕНЬШЕ 960 ДРУГ ПОД ДРУГОМ КОЛОНКИ */}
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
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', verticalAlign: 'top', fontSize: '18px' }} >Творечское объединение</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                        {/* <Link href="#" target="_blank" rel="noopener noreferrer">
                                            VK
                                        </Link> */}
                                        <IconButton
                                            onClick={() => window.open('https://vk.com/robot_tom')}
                                            size="small"
                                        >
                                            <img src={"/media/vk.png"} alt="Педагог 2" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', fontSize: '18px' }} >Преподают педагоги: </TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none', fontSize: '18px' }}>
                                        <IconButton
                                            onClick={() => window.open('https://cpc.tomsk.ru/nashi-sotrudniki/ivanov-sergey-olegovich/')}
                                            size="small"
                                            style={{ marginRight: '8px' }} // Расстояние между кнопками
                                        >
                                            <img src={imagePath1} alt="Педагог 1" style={{ width: '128px', height: '128px', borderRadius: '50%' }} />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => window.open('https://cpc.tomsk.ru/nashi-sotrudniki/chernyih-aleksey-andreevich/')}
                                            size="small"
                                        >
                                            <img src={imagePath2} alt="Педагог 2" style={{ width: '128px', height: '128px', borderRadius: '50%' }} />
                                        </IconButton>
                                </TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    
                </Box>
            </Box>
        </>
    )
}