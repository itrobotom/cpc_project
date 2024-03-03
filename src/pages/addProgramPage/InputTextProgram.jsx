import React from 'react';
import {TextField, Typography} from "@mui/material";

const InputTextProgram = ( {textProgram, setTextProgram} ) => {
  
  const handleChange = (event) => {
        // Проверка на ограничение в 1000 символов
        if (event.target.value.length <= 1250) {
            setTextProgram(event.target.value);
        } else {
            alert('Превышин лимит в 1250 символов');
        }
  };

  return (
    <>
        <Typography
            variant="h6" gutterBottom
        >
            Введите аннотацию программы (не более 1250 символов)*:
        </Typography>
        <TextField
            id="outlined-multiline-flexible"
            label="Введите аннотацию программы"
            multiline
            rows={10} // Здесь устанавливаем начальную высоту поля на 10 строк
            value={textProgram}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{ width: '90%', margin: '10px' }} 
        />
    </>
  );
}

export default InputTextProgram;