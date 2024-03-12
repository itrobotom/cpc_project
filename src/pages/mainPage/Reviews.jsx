import React from 'react';
import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';

const Reviews = ({bgColor}) => {
  const reviewsData = [
    {
      id: 1,
      text: 'Добрый день! Сын занимался по программе "Беспилотные автомобили на Arduino". Эта программа очень понравилась. Было сложно, но интересно. Особенно понравилась работа на лазерном станке и 3D принтере. Будем рады продолжить обучение в следующем году!',
      author: 'Мама Артёма К.',
    },
    {
      id: 2,
      text: 'Здравствуйте! Робототехника и беспилотные автомобили. Хочу поблагодарить за полученные ценные знания! Очень интересно и познавательно. Записались на следующий год. Будем ходить, пока можно:) спасибо большое!',
      author: 'Мама Артёма Ф.',
    },
    {
      id: 3,
      text: 'Спасибо, Вам большое, за привитый интерес к Ардуино), знания, умения, навыки в технической направленности) За ваш педагогический труд, доверие и уважение к нашему ребенку, за прекрасную смену "Матрица ..." и ваши уроки. Дальнейшей плодотворной работы, талантливых детей) и нескончаемого оптимизма!',
      author: 'Мама Николая К.',
    },
    {
      id: 4,
      text: 'Выражаем огромную благодарность педагогам за отзывчивость, умение донести материал! Мы обучались по категории "Робот по линии" в среде Arduino. Были очень полезные уроки. Пусть у вас будет много талантливых учеников! Желаем творческих успехов!',
      author: 'Мурат, тренер по спортивной робототехнике из Казахстана',
    },
  ];

  return (
    <Box py={4} bgcolor="#fff" style={{ margin: '0 auto', paddingBottom: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: bgColor }}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '10px', marginTop: '30px' }}>
        Отзывы
      </Typography>
      <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: '30px' }}>
        Ждем обратную связь от родителей и учеников у нас в <a href="https://vk.com/cpc.tomsk" target="_blank">официальной группе Вконтакте</a>
      </Typography>
      
      <Grid container spacing={3} xs={11} md={9} style={{ padding: '20px' }}>
        {reviewsData.map((review) => (
          <Grid key={review.id} item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', minHeight: '80%' }}>
              <Typography variant="body1" gutterBottom style={{ flexGrow: 1 }}>
                {review.text}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  maxWidth: '50%', // Добавлено ограничение для ширины контейнера
                  marginLeft: 'auto', // Смещение вправо
                }}
              >
                <Avatar sx={{ width: 40, height: 40, backgroundColor: bgColor, marginRight: 1 }} />
                <Typography variant="subtitle2">{review.author}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default Reviews;
