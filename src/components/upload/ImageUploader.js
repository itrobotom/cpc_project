import React, { useRef } from 'react';
import axiosBase from '../../axios';
import { Button }   from '@mui/material';

const ImageUploader = ( {setImageUrl} ) => {
    const inputFileRef = useRef(null);
    //функция для проверки изменения хранилища для изображения
    const handleChangeImg = async (event) => {
        try {
            console.log(event.target.files); //увидим информацию о загруженном файле
            const imgData = new FormData(); //формат хранилища для изображения для отправки его на бэкенд и ниже сразу это делаем
            const img = event.target.files[0];
            console.log('formData ', img);
            imgData.append('image', img); 
            const { data } = await axiosBase.post('/upload', imgData)
            console.log('Ссылка на загруженный на сервер картинки ', data.url);
            setImageUrl(data.url);
        } catch(err){
            console.warn(err); 
            alert('Ошибка при загрузке изображения');
        }
    };

    return (
        <>
            <Button 
                onClick={() => inputFileRef.current.click()}
                variant="outlined" 
                size="large"
            >
                Загрузить изображение
            </Button>
            <input 
                ref={inputFileRef}
                type="file" 
                onChange={handleChangeImg} 
                hidden //скрыть на странице элемент
            />
        </>
    );
}
  
export default ImageUploader;