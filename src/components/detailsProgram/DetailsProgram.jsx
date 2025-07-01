// import { useDispatch, useSelector } from 'react-redux'; 
// import { fetchNews } from "../../store/reducers/news.js";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ImageList, ImageListItem, Table, TableBody, TableCell, TableContainer, TableRow, Paper, useMediaQuery, useTheme } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

import { Box, Typography, IconButton, Link, Stack, LinearProgress, Button } from "@mui/material";
import "../detailsProgram/DetailsProgram.css"

import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link as RouterLink } from 'react-router-dom';
import { ImageSlider } from '../imageSlider/ImageSlider';
import { baseUrlApi } from '../constants';

import { PopupConsultation } from "../popupConsultation/PopupConsultation.jsx"

import axiosBase from '../../axios';

export function DetailsProgram() {
    const [dataProgram, setDataProgram] = useState({});
    const [isLoading, setIsLoading] = useState(true); //считаем изначально, что данные загружаются, если false, то загружены
    const { programm_id } = useParams(); 
    const isEditingProgram = Boolean(programm_id); //то есть если есть id, значит флаг isEditingProgram в true
    //console.log("Вот id открытой программы", programm_id); 

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth); // Данные пользователя (для проверки авторизации)
    const PERCENT_LEFT_COLUMN = 40;
    const PERCENT_RIGHT_COLUMN = 60;

    const [isPopupVisible, setPopupVisible] = useState(false);//открытие окна записи к специалистам
    const handleOpenPopup = () => {
        setPopupVisible(true);
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    const isMobile = useMediaQuery('(max-width:600px)');
    
    useEffect(() => {
        // Запрашиваем нужную программу по id
        axiosBase
            .get(`/programs/${programm_id}`)
            .then((res) => {
                setDataProgram(res.data);
                setIsLoading(false); //статус данные загружены
                console.log("С сервера пришла программа ", res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Ошибка при получении программы");
            })
    }, []); // Запускаем запрос при изменении статуса аутентификации
    
    //рассчет высоты галереи (от количества фото в галерее)
    let heightGalery = 1300;
    if(dataProgram && dataProgram.arrLinkImg){
        const lengthArrLinkImg = dataProgram.arrLinkImg.length;
        // console.log("sag", heightGalery)
        if(lengthArrLinkImg > 10) heightGalery = 2800
        else if(lengthArrLinkImg > 8) heightGalery = 2000
        else if(lengthArrLinkImg > 6) heightGalery = 1600
        else if(lengthArrLinkImg > 4) heightGalery = 1200
        else if(lengthArrLinkImg > 2) heightGalery = 800
        else if(lengthArrLinkImg > 0) heightGalery = 400
    }
    
    
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
                    {isPopupVisible && <PopupConsultation isOpenPopupClick={ true } onClose={ handleClosePopup }/>}
                    <Box
                        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column', lg: 'row' }}} 
                    >
                        <Box 
                            ml='auto' 
                            mr='auto'
                            // pl='10px'
                            sx = {{ pt: 0, width: isMobile ? "95%" : "85%", overflow: 'auto'}}
                        >
                            
                            <Box>
                                {/* проверим если авторизован то покажем кнопку редактировать программу */}
                                {(data !== undefined && data !== null) && (
                                    <Box sx={{display: "flex", justifyContent: "end"}}>
                                        <Button 
                                            variant="outlined" 
                                            sx={{marginRight: "20px"}}
                                        >
                                            <a href={`/program/${programm_id}/edit`} style={{textDecoration: "none"}}>
                                                Редактировать программу
                                            </a>
                                            
                                        </Button>
                                    </Box>
                                )}
                                <Box
                                    sx={{ display: 'flex'}} 
                                >
                                    <RouterLink
                                        to={'/learn'}
                                    >
                                        <IconButton  
                                        sx = {{ mb: 2, mr: 0 }}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </RouterLink>
                                    
                                    <Typography 
                                        ml='0px' color="#000000" variant= {isMobile ? "h5" : "h4"} gutterBottom
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
                                    {dataProgram.arrLinkImg.length > 0 ? (
                                        <>
                                            <Typography
                                                ml='0px'
                                                sx={{
                                                    pt: 1,
                                                    pl: 2,
                                                    width: { xs: '95%', md: '95%', lg: '50%' },
                                                    fontSize: '18px',
                                                    textAlign: 'justify',
                                                }}
                                            >
                                                {dataProgram.textProgram}
                                            </Typography>
                                            <Box sx={{ width: { xs: '100%', md: '100%', lg: '50%' } }}>
                                                {/* добавить скелетон, если изображение не прогрузилось */}
                                                <ImageSlider arr_img_url={dataProgram.arrLinkImg} />
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography
                                            ml='0px'
                                            sx={{
                                                pt: 1,
                                                pl: 2,
                                                width: '100%', // Установите ширину на 100%
                                                fontSize: '18px',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {dataProgram.textProgram}
                                        </Typography>
                                    )}
                                    
                                </Box>


                                <TableContainer component={Paper} style={{ boxShadow: 'none', border: 'none', width: '100%'}}>
                                    <Table style={{ borderCollapse: 'collapse', backgroundColor: 'transparent' }}>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Финансирование:</TableCell>
                                            {dataProgram.isBudgetProgramm ? 
                                                (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >бюджетная программа</TableCell>) :
                                                (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >платная услуга</TableCell>)}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Возраст:</TableCell>
                                            {dataProgram.ageRangeProgram[0] === dataProgram.ageRangeProgram[1] ? 
                                            (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{`${dataProgram.ageRangeProgram[0]} лет`}</TableCell>) :
                                            (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{`${dataProgram.ageRangeProgram[0]}-${dataProgram.ageRangeProgram[1]} лет`}</TableCell>)}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Срок обучения:</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{dataProgram.trainingPeriod}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Количество занятий в неделю:</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{dataProgram.numLessons}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Количество обучающихся в группе:</TableCell>
                                            {dataProgram.numberStudents[0] === dataProgram.numberStudents[1] ? 
                                            (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{dataProgram.numberStudents[0]}</TableCell>) :
                                            (<TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{`${dataProgram.numberStudents[0]}-${dataProgram.numberStudents[1]}`}</TableCell>)}
                                        </TableRow> 
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Специализация:</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{dataProgram.typesProgram.join(', ')}</TableCell>
                                        </TableRow>
                                        
                                        {dataProgram.fileUrl && 
                                        (<TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Скачать программу: </TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                <Link href={`${baseUrlApi}${dataProgram.fileUrl}`} target="_blank" rel="noopener noreferrer">
                                                    текст программы
                                                </Link>
                                            </TableCell>
                                        </TableRow>)}
                                                
                                        <TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', verticalAlign: 'top', fontSize: '18px' }} >Подойдет ли программа ребенку?</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                <Link href="https://testometrika.com/business/test-to-determine-career/" target="_blank" rel="noopener noreferrer">
                                                    Пройти тест 
                                                </Link> 
                                                {' '}Климова на профориентацию или{' '}
                                                {/* <Link href="#" target="_blank" rel="noopener noreferrer">
                                                записаться 
                                                </Link>  */}
                                                <Button
                                                    onClick={handleOpenPopup}
                                                    // color="success"
                                                >
                                                    записаться
                                                </Button>
                                                {' '}на проф консультацию к специалистам нашего центра
                                            </TableCell>
                                        </TableRow>

                                        {dataProgram.linkVideo && (
                                            isMobile ? (
                                                <TableRow>
                                                    <TableCell colSpan={2} style={{ borderBottom: 'none', padding: 0 }}>
                                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                                            <iframe
                                                                title="YouTube Video"
                                                                width="100%"
                                                                height="100%"
                                                                src={dataProgram.linkVideo}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                <TableRow>
                                                    <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px', verticalAlign: 'top' }}>
                                                        {dataProgram.commentVideo}
                                                    </TableCell>
                                                    <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                                            <iframe
                                                                title="YouTube Video"
                                                                width="100%"
                                                                height="100%"
                                                                src={dataProgram.linkVideo}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}

                                        
                                        {dataProgram.linkPosts.length !== 0 &&
                                        (<TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}> Новостные посты, освещающие деятельность, достижения обучающихся: </TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                {dataProgram.linkPosts.map(element => (
                                                    <Box key={element.comment}>
                                                        <Link href={element.link} target="_blank" rel="noopener noreferrer">
                                                            {element.comment}
                                                        </Link> 
                                                    </Box>
                                                ))}
                                            </TableCell>
                                        </TableRow>)}

                                        {/* ссылка на группу */}
                                        {dataProgram.linkGroup && 
                                        (<TableRow >
                                            {/* О том, чем занимаются дети рассказываем в социальных сетях. Как проходят занятия, участие в соревнованиях, конкурсах. Следите за нашими новостями! */}
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', verticalAlign: 'top', fontSize: '18px' }} >О том, чем занимаются дети рассказываем в социальных сетях. Следите за нашими новостями!</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                <IconButton aria-label="vk">
                                                    <a href={dataProgram.linkGroup} target="_blank">
                                                        <FontAwesomeIcon icon={faVk} style={{ color: "#0077ff", fontSize: "40px", verticalAlign: 'middle' }} />
                                                    </a>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>)}
                                        
                                        {dataProgram.instructors.length !== 0 &&
                                        (<TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Педагоги: </TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                {dataProgram.instructors.map(element => (
                                                    <Box key={element.name}>
                                                        <Link href={element.link} target="_blank" rel="noopener noreferrer">
                                                            {element.name}
                                                        </Link> 
                                                    </Box>
                                                ))}
                                            </TableCell>
                                        </TableRow>)}
                                        
                                        {dataProgram.instructors[0].accountId && 
                                        (<TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Остались вопросы?</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>
                                                <a href={`https://web.vk.me/convo/${dataProgram.instructors[0].accountId}`} target="_blank" rel="noopener noreferrer">НАПИШИТЕ</a>
                                                {" "} свой вопрос педагогу в Сферум.
                                            </TableCell>
                                        </TableRow>)}

                                        {dataProgram.commentProgram && 
                                        (<TableRow>
                                            <TableCell style={{ width: `${PERCENT_LEFT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }} >Комментарий:</TableCell>
                                            <TableCell style={{ width: `${PERCENT_RIGHT_COLUMN}%`, borderBottom: 'none', fontSize: '18px' }}>{dataProgram.commentProgram}</TableCell>
                                        </TableRow>)}

                                        
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                                {dataProgram.arrLinkImg.length > 0 && 
                                (<Box style={{ margin: "0 auto", maxWidth: 1200 }}>
                                    <Typography 
                                        sx={{
                                            fontSize: '22px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Галерея
                                    </Typography>
                                    <ImageList sx={{ maxWidth: isMobile ? '100%' : 1200, height: heightGalery }} cols={isMobile ? 1 : 2}  rowHeight={164}>
                                        {dataProgram.arrLinkImg.map((item) => (
                                            <ImageListItem key={item}>
                                            <img
                                                //srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${baseUrlApi}${item}`}
                                                //alt={item.title}
                                                loading="lazy"
                                            />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>)}
                                
                            </Box>
                            
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}