import { useNavigate } from 'react-router-dom'
import { React, useState, useEffect } from 'react';
import { Box, Typography, Link, useMediaQuery } from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const imagePaths = [
    "media/main/main2.jpg",
    "media/main/main3.jpg",
    // "media/main/main16.jpg",
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

const SliderCover = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const navigate = useNavigate(); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOpacity(0.3); // Затемнение до 30%, чтобы не было полного исчезновения

            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
                );

                setOpacity(1); // Быстро возвращаем яркость
            }, 300); // Быстрый переход (0.3 секунды)
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box position="relative" height="75vh" overflow="hidden">
            <img
                src={imagePaths[currentImageIndex]}
                alt="Плакат сайта"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.3s ease-in-out', // Ускоряем анимацию
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
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Лёгкое затемнение поверх картинки
                    transition: 'opacity 0.3s ease-in-out',
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
                <Typography variant={isMobile ? "h4" : "h3"} gutterBottom>
                    Выбери правильную траекторию развития ребенка
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Пройди тест и выбери по интересам, навыкам образовательную программу
                </Typography>
                <button className='custom-button' onClick={() => navigate("/learn")}>
                    Записаться
                </button>
            </Box>
        </Box>
    );
};

export default SliderCover;

//старый слайдер
// const SliderCover = () => {
//     const isMobile = useMediaQuery('(max-width:600px)');

//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [opacity, setOpacity] = useState(1);

//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//         // Уменьшаем непрозрачность до 0
//         setOpacity(0);

//         // Ждем немного (500 мс) перед сменой изображения
//         setTimeout(() => {
//             // Увеличиваем индекс текущего изображения
//             setCurrentImageIndex((prevIndex) =>
//             prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
//             );

//             // Устанавливаем непрозрачность обратно до 1
//             setOpacity(1);
//         }, 500);
//         }, 5000);

//         return () => clearInterval(intervalId);
//     }, []); 
    
//     return(
//         // height="75vh" - обрезает высоту изображения плаката 
//         <Box position="relative" height="75vh" overflow="hidden">
//             <img
//                 src={imagePaths[currentImageIndex]}
//                 alt="Плакат сайта"
//                 style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover', 
//                     //смена изображений с эффектом высветления
//                     transition: 'opacity 1s ease-in-out', 
//                     opacity: opacity, 
//                 }}
//             />
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     //смена изображений с эффектом высветления
//                     transition: 'opacity 1s ease-in-out',
//                     opacity: opacity,
//                 }}
//             />
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     textAlign: "center",
//                     color: "#fff",
//                     zIndex: 1,
//                 }}
//             >
//                 <Typography variant={isMobile ? "h4" : "h3"} gutterBottom>
//                     Выбери правильную траекторию развития ребенка
//                 </Typography>
//                 <Typography variant="h5" gutterBottom>
//                     Пройди тест и выбери по интересам, навыкам образовательную программу
//                 </Typography>
//                 {/* <Link 
//                     href="https://forms.yandex.ru/cloud/6603c92502848f5bd21efeca/" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                 > */}
//                     <button className='custom-button' onClick={()=> navigate("/learn")}>
//                         Записаться
//                     </button>
//                 {/* </Link> */}
//             </Box>
//         </Box>
//     )
// }