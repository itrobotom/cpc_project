import { React, useEffect, useState, useCallback } from 'react';
import { TextField, Typography, Box, Grid }  from '@mui/material';

const NumbersStudent=( {numberStudents, setNumberStudents} ) => {
    const [minNum, setMinNum] = useState(numberStudents[0]);
    const [maxNum, setMaxNum] = useState(numberStudents[1]);

    const handleMinNum = useCallback((num) => {
        setMinNum(Number(num.target.value));
    }, []);
    const handleMaxNum = useCallback((num) => {
        setMaxNum(Number(num.target.value));
    }, []);

    useEffect(()=>{
        setNumberStudents([minNum, maxNum]);
    }, [minNum, maxNum]);
    
    return(
        <>
            <Typography variant="h6" gutterBottom>
                Введите минимальное и максимальное количество детей в группе (если мин и макс одно и то же число, укажите его в обоих полях)*:
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="min-num"
                        label="Минимальное"
                        value={minNum}
                        onChange={handleMinNum}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        style={{ width: '20%', margin: '10px'}} 
                    />
                    <TextField
                        id="max-num"
                        label="Максимальное"
                        value={maxNum}
                        onChange={handleMaxNum}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        style={{ width: '20%', margin: '10px'}} 
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default NumbersStudent; 