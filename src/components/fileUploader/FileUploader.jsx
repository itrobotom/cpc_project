import React, { useRef, useState } from 'react';
import axiosBase from '../../axios';
import { Button, Typography, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const FileUploader = ({ url, folder, fileUrl, setFileUrl }) => {
    const inputFileRef = useRef(null);
    
    const [fileName, setFilename] = useState('');

    const handleFileUpload = async (event) => {
        try {
            const file = event.target.files[0];
            const generateFileName = `${generateRandomString(8)}.${file.name.split('.').pop()}`;
            console.log()
            setFilename(generateFileName);
            const formData = new FormData();
            formData.append('file', file, `${folder}/${generateFileName}`);
            console.log("Имя перед загрузкой ", generateFileName); 
            axiosBase.post(`/${url}`, formData)
                .then(response => {
                    console.log('Ссылка на загруженный на сервер файл: ', response.data.url);
                    setFileUrl(response.data.url);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке файла: ', error);
                    alert('Произошла ошибка при загрузке файла');
                });
        } catch (err) {
            console.warn('Ошибка при загрузке файла: ', err);
            alert('Произошла ошибка при загрузке файла');
        }
    };

    const handleRemoveFile = async () => {
        try {
            console.log('Путь для удаления файла ', fileUrl);
            await axiosBase.delete(fileUrl);
            console.log('Файл успешно удален');
            setFileUrl(null);
        } catch (err) {
            console.error('Ошибка при удалении файла: ', err);
            alert('Произошла ошибка при удалении файла');
        }
    };

    return (
        <>
            {fileUrl ? (
                <>
                    <Typography> <AttachFileIcon /> {fileName}</Typography>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleRemoveFile}
                        sx={{marginRight: "20px"}}
                    >
                        Удалить
                    </Button>
                    
                </>
            ) : (
                <>
                    <Box ml={2}>
                        <Button 
                            onClick={() => inputFileRef.current.click()}
                            variant="outlined" 
                            size="large"
                            sx={{ mr: "20px", mt: "20px" }}
                        >
                            Загрузить файл
                        </Button>
                        <input 
                            ref={inputFileRef}
                            type="file" 
                            onChange={handleFileUpload} 
                            hidden 
                        />
                    </Box>
                </>
            )}
        </>
    );
};

export default FileUploader;