import React from 'react';
import axiosBase from '../../../axios';

import DeleteIcon from '@mui/icons-material/Clear';
import { IconButton, Box } from "@mui/material";

import { baseUrlApi } from '../../constants';

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
    
            // Если возникла ошибка, но изображение было удалено, нужно обновить массив урлов
            if (err.response && err.response.status === 404) {
                console.log('Изображение уже удалено с сервера');
    
                // Обновление массива урлов после удаления
                setArrLinkImg(arr => arr.filter(url => url !== imageUrl));
            } else {
                alert('Произошла ошибка при удалении фото');
            }
        }
    };

    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "space-start", 
            width: "90%",
            flexWrap: "wrap", // Позволяет элементам переноситься на следующую строку
        }}>
            {imageUrls.map((imageUrl, index) => (
                <Box key={index} sx={{marginRight: "3rem"}}>  
                    <Box position="relative" display="inline-block">
                        <img className="image-width" src={`${baseUrlApi}${imageUrl}`} alt="Uploaded" />
                        <IconButton 
                            onClick={() => handleDelete(imageUrl)} 
                            style={{ 
                                position: 'absolute', 
                                top: 0, 
                                right: 0, 
                                color: 'black', 
                                backgroundColor: 'white', 
                                borderRadius: '50%' 
                            }} 
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ImageGalleryWithDeletion;
