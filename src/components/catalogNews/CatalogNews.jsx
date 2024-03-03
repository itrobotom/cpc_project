import { useDispatch, useSelector } from 'react-redux'; 
import { fetchNews } from "../../store/reducers/news.js";
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography, LinearProgress, Stack } from "@mui/material"; 
import { CardNews } from "../../components/cardNews/CardNews.jsx"
import NewsPagination from '../filterNews/newsPagination/NewsPagination.jsx';
import dayjs from 'dayjs';

export function CatalogNews() {
    const dispatch = useDispatch();
    const { news } = useSelector((state) => state.news); //все новости объектом
    const isLoadingNews = news.status === 'loading';
    const { data } = useSelector((state) => state.auth); //данные пользователя
    const typeNewsStore  = useSelector(state => state.valueFiltersNews.type); //данные из фильтра типов направлений 
    const yearInterval = useSelector(state => state.valueFiltersNews.yearRange); 
    const inputName = useSelector(state => state.valueFiltersNews.nameNews);

    //пагинация
    const PAGE_NUM_DEFAULT = 1; 
    const PAGE_COUNT_DEFAULT = 1; 
    const COUNT_NEWS_ON_PAGE = 5; 
    const [pageNum, setPageNum] = useState(PAGE_NUM_DEFAULT); 
    const [pageCount, setPageCount] = useState(PAGE_COUNT_DEFAULT);
    //const [objNewsFiltered, setObjNewsFiltered] = useState({});

    const COUNT_TYPES_NEWS = 9;

    useEffect(() => {
        dispatch(fetchNews())
    }, [])

    let catalogNewsFilterWithPagination; //количество новостей с учетом фильтров и пагинации
    let catalogNewsListFilter;
    useEffect(() => {
        //console.log("вот новости отфильтрованные ", catalogNewsListFilter);
        catalogNewsListFilter && setPageCount(Math.ceil(catalogNewsListFilter.length/COUNT_NEWS_ON_PAGE));
        setPageNum(PAGE_NUM_DEFAULT); //переводим на первую страницу чтобы правильно поиск работал по фильтрам, если мы начали это делать не на первой странице
    }, [typeNewsStore, yearInterval, inputName, news])

    //выбираем новости по фильтрам, когда мы их загрузили на клиент в браузер
    if(!isLoadingNews){
        //console.log('Объект всех новостей!!!: ', news);
        //console.log('Номер страницы из паганиции, который кликнули ', page);
        catalogNewsListFilter = news.items.filter((element) => {
            let includedInRange = false; 
            const dateNewsFormatString = dayjs(element.dateNewsFormat).format('DD.MM.YYYY');
            if(dateNewsFormatString.length > 0){ // проверяем не пустая ли дата и Извлекаем последние четыре символа
                const yearString = dateNewsFormatString.substring(dateNewsFormatString.length - 4);//последние 4 символа это год
                // Преобразуем строку в число, чтобы проверить границы
                const yearNumber = parseInt(yearString);
                includedInRange = ((yearNumber >= yearInterval.min) && (yearNumber <= yearInterval.max));
            } 
            //добавим фильтр по отбору по заголовку новости
            const includedSearchName =  element.title.toLowerCase().includes(inputName);
            //console.log('ТИП НОВОСТИ', element.typesProgramStore);
            //фильтр по типу новости
            let includedType = true;
            //console.log('Выбираем в панели тип новости', typeNewsStore);
            if(typeNewsStore.length < COUNT_TYPES_NEWS) { //COUNT_TYPES_NEWS - 9, то каждая новость попадет в отображаение, как буд-то выбраны все типы, но как только мы выберем нужные пункты, нужно отфильтровать по критерию
                for (let i = 0; i < element.typesProgramStore.length; i++) { //переберем все типы новостей, отмеченные при ее создании
                    //console.log(count)
                    includedType = typeNewsStore.some(item => item === element.typesProgramStore[i]); //typeNewsStore-выбор в фильтре
                    if (includedType){
                        break; //прерываем for как только встретили попавшийся тип, иначе если поседний не встретится, то программа не найдется
                    }
                    //console.log("найден тип программы", includedType);
                }
            } else {
                includedType = true; 
            }   
            //console.log('Флаги по фильтрам', {includedInRange, includedSearchName, includedType})
            if (includedInRange && includedSearchName && includedType){ 
                return element;
            }
        });
        
        //setPage(Math.ceil(catalogNewsListFilter.length/COUNT_NEWS_ON_PAGE))
        //обрежем объект в зависимости от номера страницы, например если 1я, то первые 5 новостей
        //брать надо не page, потому как когда поиск делаем, у нас обрезается 
        console.log("Количество страниц ", pageCount);
        catalogNewsFilterWithPagination = catalogNewsListFilter.slice((COUNT_NEWS_ON_PAGE*pageNum)-COUNT_NEWS_ON_PAGE, (COUNT_NEWS_ON_PAGE*pageNum)); 
    }
    return(
        <>
            <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
                alignContent: "flex-start",
                // расстояние для пространства блока с фильтрами
                pl: "37rem",
                "@media(max-width: 50rem)": {
                    p: "0rem",
                    ml: "5rem", 
                    // pl: "10rem",
                },
            }}
            >
                <Grid container spacing={4}>
                    {/* xs={11} - количество колонок под мобилку md={9} - под ПК */}
                    <Grid xs={11} md={9} item> 
                    
                    {isLoadingNews ? ( //грузим карточки только тогда, когда пришел ответ от сервера, а до - индикатор прогресса
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
                            <LinearProgress color="success" />
                        </Stack>
                        </Box>
                    ) : (
                        <>
                            {catalogNewsFilterWithPagination.length > 0 ? (
                                catalogNewsFilterWithPagination.map((obj, index) => (
                                    <CardNews
                                        key={obj._id} // Add key prop for React list items
                                        id={obj._id}
                                        title={obj.title}
                                        imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
                                        isEditable={data !== undefined && data !== null} // Check if data is not undefined or null
                                        textNews={obj.text}
                                        typesProgramStore={obj.typesProgramStore}
                                        programName={obj.programName}
                                        dateNewsFormat={obj.dateNewsFormat}
                                        linkProgramm={obj.linkProgramm}
                                        linkNews={obj.linkNews}
                                    />
                                ))
                            ) : (
                                <Box
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
                                    <Typography variant="body1">Новостей по данным параметрам не найдено</Typography>
                                </Box>
                            )}
                        </>
                    )}
                    <NewsPagination 
                        pageCount={pageCount}
                        setPageNum={setPageNum}
                    />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}