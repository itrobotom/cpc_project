import React, { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import { baseUrlApi } from '../constants';

const TIME_ANIMATION_MS = 500; //пауза перехода 
const TIME_SLIDE_MS = 3000; //пауза при пролистывании изображений 
  
const ImageSlider = ({ arr_img_url }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const changeImage = () => {
    setIsVisible(false); // Начинаем анимацию исчезновения
    setTimeout(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % arr_img_url.length);
      setIsVisible(true); // Завершаем анимацию исчезновения и начинаем анимацию появления
    }, TIME_ANIMATION_MS); 
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, TIME_SLIDE_MS); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Fade key={currentPhotoIndex} in={isVisible} timeout={1000}>
      <CardMedia
        component="img"
        sx={{ width: '95%', m: 0, ml: 2, height: '400px', minWidth: '50%' }}
        image={`${baseUrlApi}${arr_img_url[currentPhotoIndex]}`} // Используем текущий индекс для получения URL из массива
        alt={`photo_${currentPhotoIndex}`} // В качестве альтернативного текста используем индекс
      />
    </Fade>
  );
};

export { ImageSlider };