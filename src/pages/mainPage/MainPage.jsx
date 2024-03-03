import { React, useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, Button, Grid } from "@mui/material";

import HeaderMain from "../../components/headerMain/HeaderMain.jsx"
import Advantages from '../../components/advantages/Advantages.jsx';
import Reviews from '../../components/reviews/Reviews.jsx';
import Partners from '../../components/partners/Partners.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { positions } from '@mui/system';

import Slider from 'react-slick';

import "./MainPage.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const imagePaths = [
  "media/main/main2.jpg",
  "media/main/main3.jpg",
  "media/main/main16.jpg",
  "media/main/main15.jpg",
  "media/main/main44.jpg",
  "media/main/main55.jpg",
  "media/main/main1.jpg",
  "media/main/main7.jpg",
  "media/main/main88.jpg",
  "media/main/main9.jpg",
  "media/main/main10.jpg",
  "media/main/main11.jpg",
];

const images = [
  'media/galery/1.jpg',
  'media/galery/2.jpg',
  'media/galery/3.jpg',
  'media/galery/4.jpg',
  'media/galery/5.jpg',
  'media/galery/6.jpg',
  'media/galery/7.jpg',
  'media/galery/8.jpg',
  'media/galery/9.jpg',
  'media/galery/10.jpg',
  'media/galery/11.jpg',
  'media/galery/12.jpg',
  'media/galery/14.jpg',
  'media/galery/15.jpg',
  'media/galery/16.jpg',
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Уменьшаем непрозрачность до 0
      setOpacity(0);

      // Ждем немного (500 мс) перед сменой изображения
      setTimeout(() => {
        // Увеличиваем индекс текущего изображения
        setCurrentImageIndex((prevIndex) =>
          prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
        );

        // Устанавливаем непрозрачность обратно до 1
        setOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      <HeaderMain />
      {/* height="75vh" - обрезает высоту изображения плаката */}
      <Box position="relative" height="75vh" overflow="hidden">
        <img
          src={imagePaths[currentImageIndex]}
          alt="Плакат сайта"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            //смена изображений с эффектом высветления
            transition: 'opacity 1s ease-in-out', 
            opacity: opacity, 
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            //смена изображений с эффектом высветления
            transition: 'opacity 1s ease-in-out',
            opacity: opacity,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Выбери правильную траекторию развития ребенка
          </Typography>
          <Typography variant="h5" gutterBottom>
            Пройти тест и выбрать по интересам, навыкам образовательную программу
          </Typography>
          <button className='custom-button'>
            Записаться
          </button>
        </Box>
      </Box>

      {/* миссия */}
      <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '70vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
        <Grid item xs={8} alignSelf="center">
          <Typography variant="h3" align="center" gutterBottom>
            Миссия центра
          </Typography>
          <Typography fontSize={"28px"} align="center">
          «В жизни каждого человека, возникает время, когда нужно сделать выбор. Выбор профессии зачастую сопровождается различного рода трудностями. Ведущая идея создания Центра заключается в создании специальных условий для допрофессионального самоопределения старшеклассников. В нашем центре уже с раннего возраста доступны различные программы и траектории развития, поэтому в старшем классе ребенку будет гораздо проще сделать правильный выбор»
          </Typography>
        </Grid>
      </Grid>

      {/* о деятельности просто текстом*/}
      {/* <Grid container spacing={2} style={{ backgroundColor: '#4FD1C5', padding: '20px', minHeight: '70vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
        <Grid item xs={8} alignSelf="center">
          <Typography variant="h2" align="center" gutterBottom>
            Миссия центра
          </Typography> 
          <Typography fontSize={"32px"} align="center">
          Наш центр предлагает разнообразные направления, включая технические и инженерные дисциплины, программирование и робототехнику, гуманитарные и социальные науки, естественно-научные направления, искусство и дизайн, экономику и бизнес, патриотические занятия, изучение иностранных языков, а также обучение в области экологии и охраны окружающей среды.
          </Typography>
        </Grid>
      </Grid> */}

      {/* о деятельности тестом и видео рядом*/}
      {/* синий крафт 
      background-color: #a7bed8; 159, 187, 212
      бирюза */}
      {/* синий нейтральный с лого
      #58a0dc, 88, 163, 220
      синиий с лого контрастный
      #3b75ec , 59, 117, 236*/}

      {/* backgroundColor: '#4FD1C5' */}
      
      <Grid container spacing={2} style={{ backgroundColor: '#58a0dc', padding: '20px', minHeight: '70vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} alignSelf="center">
          {/* <Typography variant="h2" align="center" gutterBottom>
            Миссия центра
          </Typography> */}
          <Typography fontSize={"28px"} align="center">
            Наш центр предлагает разнообразные направления, включая технические и инженерные дисциплины, программирование и робототехнику, гуманитарные и социальные науки, естественно-научные направления, искусство и дизайн, экономику и бизнес, патриотические занятия, изучение иностранных языков, а также обучение в области экологии и охраны окружающей среды.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} alignSelf="center">
          {/* Замените 'y5L7gmQhcWI' на фактический идентификатор видео на YouTube */}
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/y5L7gmQhcWI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Grid>
      </Grid>

      {/* галерея */}
      <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '40vh' }} alignItems="center" justifyContent="center">
        <Grid item xs={11} md={9}>
          {/* <Typography variant="h2" align="center" gutterBottom>
            Наши деятельность
          </Typography> */}
        </Grid>
        <Grid item xs={11} md={9} style={{ textAlign: 'center', marginBottom: "70px" }}>
          <Paper style={{ padding: '20px' }}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', objectFit: 'cover', maxHeight: '500px' }} />
                </div>
              ))}
            </Slider>
          </Paper>
        </Grid>
      </Grid>

      {/* преимущества обучения */}
      <Advantages />
      {/* отзывы */}
      <Reviews />

      {/* Наши партнеры */}
      <Partners />

      {/* Новости */}
      <Grid container spacing={2} style={{ backgroundColor: '#4FD1C5', padding: '20px', minHeight: '60vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
        <Grid item xs={8} alignSelf="center">
          <Typography variant="h4" align="center" gutterBottom>
            Новости!
          </Typography>
          <Typography fontSize={"28px"} align="center">
            Успехи наших учеников — важное событие для нас. Выдающиеся достижения публикуются в разделе <a href="http://localhost:3000/news">История успеха</a>. Посмотреть как проходят занятия у нас в центре, узнать результаты мероприямтий можно в социальных сетях объединений, а также в <a href="https://vk.com/cpc.tomsk" target="_blank">официальной группе Вконтакте</a>
          </Typography>
        </Grid>
      </Grid>
      
      <Footer />
    </div>
  );
}