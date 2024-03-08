import React, { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import programsData from '../../data/programs-data.json';
  
  const ImageSlider = ({ idProgramm }) => {
    const objAll = programsData.find((obj) => obj.idProgramm === idProgramm);
  const arrPhotosProgramm = objAll.photosProgram;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const changeImage = () => {
    setIsVisible(false); // Начинаем анимацию исчезновения
    setTimeout(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % arrPhotosProgramm.length);
      setIsVisible(true); // Завершаем анимацию исчезновения и начинаем анимацию появления
    }, 1000); // Измените на нужную вам паузу в миллисекундах
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 3000); // Измените на нужный вам интервал в миллисекундах

    return () => clearInterval(intervalId);
  }, []);

  return (
    
    <Fade key={currentPhotoIndex} in={isVisible} timeout={1000}
    >
      <CardMedia
        component="img"
        sx={{ width: '95%', m: 0, ml: 2, height: '400px', minWidth: '50%' }}
        image={arrPhotosProgramm[currentPhotoIndex].path}
        alt={`photo_${arrPhotosProgramm[currentPhotoIndex].id}`}
      />
    </Fade>
  );
};

export { ImageSlider };