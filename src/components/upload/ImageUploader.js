import React, { useRef } from 'react';
import axiosBase from '../../axios';
import { Button } from '@mui/material';

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const ImageUploader = ({ setImageUrl }) => {
    const inputFileRef = useRef(null);

    // Функция для обработки загрузки изображения
    const handleChangeImg = async (event) => {
        try {
            const img = event.target.files[0];
            const formData = new FormData();
            const fileName = `${generateRandomString(8)}.${img.name.split('.').pop()}`;

            // Проверяем размер файла
            if (img.size > 1024 * 1024) { // Если размер файла больше 1 МБ
                // Создаем объект Image для работы с изображением
                const image = new Image();
                image.src = URL.createObjectURL(img);
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 1980;
                    canvas.height = (image.height / image.width) * canvas.width;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    // Получаем данные изображения в формате base64
                    const resizedImageData = canvas.toDataURL('image/jpeg');

                    // Преобразуем base64 в Blob
                    fetch(resizedImageData)
                        .then(res => res.blob())
                        .then(blob => {
                            formData.append('image', blob, fileName);
                            axiosBase.post('/upload', formData)
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
                formData.append('image', img, fileName);
                axiosBase.post('/upload', formData)
                    .then(response => {
                        console.log('Ссылка на загруженное на сервер изображение: ', response.data.url);
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
                hidden 
            />
        </>
    );
};


  
export default ImageUploader;



//без ужатия

// import React, { useRef } from 'react';
// import axiosBase from '../../axios';
// import { Button }   from '@mui/material';

// const generateRandomString = (length) => {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// };

// const ImageUploader = ( {setImageUrl} ) => {
//     const inputFileRef = useRef(null);
//     //функция для проверки изменения хранилища для изображения
//     const handleChangeImg = async (event) => {
//         try {
//             console.log(event.target.files); //увидим информацию о загруженном файле
//             const imgData = new FormData(); //формат хранилища для изображения для отправки его на бэкенд и ниже сразу это делаем
//             const img = event.target.files[0];
//             console.log('formData ', img);
//             const fileName = `${generateRandomString(8)}.${img.name.split('.').pop()}`; // Генерируем случайное имя файла
//             imgData.append('image', img, fileName); 
//             const { data } = await axiosBase.post('/upload', imgData)
//             console.log('Ссылка на загруженный на сервер картинки ', data.url);
//             setImageUrl(data.url);
//         } catch(err){
//             console.warn(err); 
//             alert('Ошибка при загрузке изображения');
//         }
//     };

//     return (
//         <>
//             <Button 
//                 onClick={() => inputFileRef.current.click()}
//                 variant="outlined" 
//                 size="large"
//             >
//                 Загрузить изображение
//             </Button>
//             <input 
//                 ref={inputFileRef}
//                 type="file" 
//                 onChange={handleChangeImg} 
//                 hidden //скрыть на странице элемент
//             />
//         </>
//     );
// }
  
// export default ImageUploader;