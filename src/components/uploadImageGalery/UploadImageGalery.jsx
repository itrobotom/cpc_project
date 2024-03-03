import React, { useState } from 'react';
import axiosBase from '../../axios';
import ImageUploaderMany from '../ImageUploaderMany/ImageUploaderMany';
import { Button, Box } from '@mui/material';

const UploadedImage = ({ url, folder, arrLinkImg, setArrLinkImg }) => {
    const [imageUrl, setImageUrl] = useState('');
    //console.log("Очередная ссылка на изображение", imageUrl);
    const handleSetImageUrl = (url) => {
        //console.log("URL изображения:", url); 
        setImageUrl(url);
        setArrLinkImg([...arrLinkImg, url]); // Обновление массива ссылок при загрузке нового изображения
    };
    const handleRemoveImage = async () => {
        try {
            console.log('Путь для удаления фото ', imageUrl);
            const filteredArr = arrLinkImg.filter(link => link !== imageUrl); // Фильтрация массива для удаления текущей ссылки
            setArrLinkImg(filteredArr); // Установка нового массива без удаленной ссылки
            setImageUrl(''); // Сброс текущего URL изображения
            await axiosBase.delete(imageUrl);
            console.log('Фото успешно удалено');
        } catch (err) {
            console.error('Ошибка при удалении фото: ', err);
            alert('Произошла ошибка при удалении фото');
        }
        
    };

    return (
        <div>
            <ImageUploaderMany imageUrl={imageUrl} setImageUrl={handleSetImageUrl} url={url} folder={folder} />
            {imageUrl && (
                <>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleRemoveImage}
                    >
                        Удалить
                    </Button>
                </>
            )}
        </div>
    );
};

const UploadImageGallery = ({ url, folder, numImages, arrLinkImg, setArrLinkImg }) => {
    
    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "space-start", 
            width: "90%",
            flexWrap: "wrap", // Позволяет элементам переноситься на следующую строку
        }}>
            {[...Array(numImages)].map((_, index) => (
                <Box key={index} sx={{marginRight: "3rem"}}>
                    <UploadedImage url={url} folder={folder} arrLinkImg={arrLinkImg} setArrLinkImg={setArrLinkImg}/>
                </Box>
            ))}
        </Box>
    );
};



export default UploadImageGallery;