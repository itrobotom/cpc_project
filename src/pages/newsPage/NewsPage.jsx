import Header from "../../components/header/Header.jsx"

import React, { useEffect, useState } from 'react';

import axiosBase from '../../axios.js'; 

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Box, Typography, CircularProgress, LinearProgress, Stack } from "@mui/material"; 

import { CardNews } from "../../components/cardNews/CardNews.jsx"
import { FilterMainNews } from "../../components/filterNews/FilterMainNews.jsx"

import Footer from '../../components/footer/Footer.jsx';

export function NewsPage() {
  useEffect(() => {
    axiosBase.get('/news')
    .then(response => {
      // Обработка успешного ответа
      console.log('Получили успешный ответ', response.data);
    })
    .catch(error => {
      // Обработка ошибки
      console.log('Ошибка получения ответа с сервера:')
      console.error('Error fetching news:', error);
    });
  }, []); 

  const [page, setPage] = useState(1); //установка страницы в пагинации (для получения нужных 5 новостей)
  console.log('Страница новостей', page);
  const isLoadingNews = false;

  if(isLoadingNews) {
    return(
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
          </Box>
        </Box>
      </div>
    );
  } else {
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
                {[...Array(5)].map(() => (
                  <CardNews
                    id={1}
                    title="Победа на Всероссийских соревнованиях"
                    imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                    createdAt={'12 июня 2022 г.'}
                    isEditable
                    textNews="В Гонках по линии, организованных нашим центром, приняло участие 4 команды, включая 2 робота на платформе Lego и 2 на Arduino. Один из Lego-роботов был оснащен самодельными колесами. Несмотря на конкурентоспособность, результат этой конструкции составил 18,9 секунды, что заняло 4-е место в заездах.
                    Хотя этот Lego-робот опередил другие Lego-конструкции, ограниченные возможности платформы не позволили ему достичь высоких мест. В этом году команда нашего центра продолжила использовать эффективный подход к написанию алгоритмов, который успешно применяется в обучении учеников с 2018 года. Наш рекорд времени в 9,99 секунд на данной трассе остается непобитым в Томской области за последние 6 лет.
                    Основой для наших успешных выступлений является Arduino платформа, а собранный из линеек робот оборудован скоростными моторами и стал очень легким.
                    В текущем соревновании ученик нашего центра, Игнатченко Михаил, продемонстрировал впечатляющий результат в 12,5 секунды, что стало лучшим временем в заездах. Следующий по результату робот показал 15,6 секунд. Михаил занял 3-е место, внесший вклад в итоговый результат дополнительными материалами, такими как плакат, видео о команде и описание робота. Баллы за эти материалы составили 50% общего результата."
                  />
                ))}
              </Grid>
              <Grid xs={4} item>
                {/* <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
                <CommentsBlock
                  items={[
                    {
                      user: {
                        fullName: 'Вася Пупкин',
                        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                      },
                      text: 'Это тестовый комментарий',
                    },
                    {
                      user: {
                        fullName: 'Иван Иванов',
                        avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                      },
                      text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                  ]}
                  isLoading={false}
                /> */}
              </Grid>
            </Grid>
          </Box>
          
        </Box>
        <Footer/>
      </div> 
    );
  }
  
}