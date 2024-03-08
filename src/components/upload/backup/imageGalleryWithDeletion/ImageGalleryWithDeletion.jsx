import React from 'react';
import { Box, Button } from '@mui/material';
import axiosBase from '../../../axios';

const ImageGalleryWithDeletion = ({ imageUrls, setArrLinkImg }) => {
    const handleDelete = async (imageUrl) => {
        try {
            // Удаление изображения на сервере
            await axiosBase.delete(imageUrl);
            console.log('Фото успешно удалено');

            // Обновление массива урлов после удаления
            setArrLinkImg(arr => arr.filter(url => url !== imageUrl));
        } catch (err) {
            console.error('Ошибка при удалении фото: ', err);
            alert('Произошла ошибка при удалении фото');
        }
    };

    return (
        <div>
            {imageUrls.map((imageUrl, index) => (
                <Box key={index}>
                    <img className="image-width" src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => handleDelete(imageUrl)}
                    >
                        Удалить
                    </Button>
                </Box>
            ))}
        </div>
    );
};

export default ImageGalleryWithDeletion;
