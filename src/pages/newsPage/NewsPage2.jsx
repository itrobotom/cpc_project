import Header from "../../components/header/Header.jsx"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import axiosBase from '../../axios.js'; 
import { fetchNews } from "../../store/reducers/news.js";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Box, Typography, CircularProgress, LinearProgress, Stack } from "@mui/material"; 

import { CardNews } from "../../components/cardNews/CardNews.jsx"
import { FilterMainNews } from "../../components/filterNews/FilterMainNews.jsx"
import Footer from '../../components/footer/Footer.jsx';

export function NewsPage() {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);
  const { data } = useSelector((state) => state.auth); //данные пользователя
  const { typeNews } = useSelector(state => state.valueFilters.type); //данные из фильтра типов направлений
  const isLoadingNews = news.status === 'loading';
  

  useEffect(() => {
    dispatch(fetchNews()); 
  }, []); 

 
  const [page, setPage] = useState(1); //установка страницы в пагинации (для получения нужных 5 новостей)
  //console.log('Страница новостей', page); //меняется она в блоке с фильтрами и отображается здесь
  console.log('Получаем данные о пользователе и понимаем, авторизованы ли мы на сайте', data);
  
  return (
    <div>
      <Header/>
      <Box
        sx={{
          width: "100%",
          pt: "110px",
          "@media screen and (max-width: 768px)": {
            pt: "230px"
          }
        }}
      > 
        <FilterMainNews setPage={setPage}/>
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
          {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
            <Tab label="Новые" />
            <Tab label="Популярные" />
          </Tabs> */}
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
                  {news.items.map((obj, index) => 
                  // console.log("Url очередной статьи ", `http://localhost:5000${imageUrl}`)
                  (
                    <CardNews
                      id={obj._id}
                      title={obj.title}
                      imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
                      createdAt={'12 июня 2022 г.'}
                      isEditable={data} //если тут не undifined или null, значит будет true и авторизация пройдена
                      textNews={obj.text}
                      typesProgramStore={obj.typesProgramStore}
                      dateNews={obj.dateNews}
                      linkProgramm={obj.linkProgramm}
                      linkNews={obj.linkNews}
                    />
                  ))}
                </>
              )}
              
            </Grid>
          </Grid>
        </Box>
        
      </Box>
      <Footer/>
    </div> 
  );
}
  
