import React, { useRef, useState } from 'react';
import axiosBase from '../../../axios';
import { Button, Box } from '@mui/material';
import "./ImageUploaderMany.css"

const SIZE_IMAGE_LIMIT = 1024 * 1024 * 1; //1 Мб
const WIDTH_IMAGE_CONVERT = 1980;

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};



const ImageUploaderMany = ({ url, folder,  imageUrl, setImageUrl}) => {
    const inputFileRef = useRef(null);

    // Функция для обработки загрузки изображения
    const handleChangeImg = async (event) => {
        try {
            const img = event.target.files[0];
            const formData = new FormData();
            const fileName = `${generateRandomString(8)}.${img.name.split('.').pop()}`;

            // Проверяем размер файла
            if (img.size > SIZE_IMAGE_LIMIT) { // Если размер файла больше 1 МБ
                // Создаем объект Image для работы с изображением
                const image = new Image();
                image.src = URL.createObjectURL(img);
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = WIDTH_IMAGE_CONVERT;
                    canvas.height = (image.height / image.width) * canvas.width;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    // Получаем данные изображения в формате base64
                    const resizedImageData = canvas.toDataURL('image/jpeg');

                    // Преобразуем base64 в Blob
                    fetch(resizedImageData)
                        .then(res => res.blob())
                        .then(blob => {
                            formData.append('image', blob, `${folder}/${fileName}`);
                            axiosBase.post(`/${url}`, formData)
                                .then(response => {
                                    console.log('Ссылка на загруженное на сервер изображение: ', response.data.url);
                                    setImageUrl(response.data.url);
                                })
                                .catch(error => {
                                    console.error('Ошибка при загрузке изображения: ', error);
                                    alert('Произошла ошибка при загрузке изображения');
                                });
                        })
                        .catch(error => {
                            console.error('Ошибка при конвертации изображения в Blob: ', error);
                            alert('Произошла ошибка при загрузке изображения');
                        });
                };
            } else {
                // Файл небольшого размера, загружаем его без изменений
                formData.append('image', img, `${folder}/${fileName}`);
                axiosBase.post(`/${url}`, formData)
                    .then(response => {
                        console.log('Ссылка на загруженное на сервер изображение: ', response.data.url);
                        console.log("ссылка и папка ", {url, folder})
                        setImageUrl(response.data.url);
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке изображения: ', error);
                        alert('Произошла ошибка при загрузке изображения');
                    });
            }
        } catch(err){
            console.warn('Ошибка при загрузке изображения: ', err);
            alert('Произошла ошибка при загрузке изображения');
        }
    };

    return (
        <>
        {imageUrl ? (
             <>
                <Box mt={2}>
                    <img className="image-width" src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
                </Box>
                
            </>
            ) : (
                <> 
                    <Box m={2}>
                        <Button 
                            onClick={() => inputFileRef.current.click()}
                            variant="outlined" 
                            size="large"
                            sx={{mr: "20px"}}
                        >
                            Загрузить изображение
                        </Button>
                        <input 
                            ref={inputFileRef}
                            type="file" 
                            onChange={handleChangeImg} 
                            hidden 
                        /> 
                    </Box>
                </>
            )}
        </>
    );
};

export default ImageUploaderMany;

