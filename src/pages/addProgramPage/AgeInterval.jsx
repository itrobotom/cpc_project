import { React, useEffect, useState, useCallback } from 'react';
import { TextField, Typography, Box, Grid }  from '@mui/material';

const AgeInterval=( {ageRangeProgram, setAgeRangeProgram} ) => {
    const [minAge, setMinAge] = useState(ageRangeProgram[0]);
    const [maxAge, setMaxAge] = useState(ageRangeProgram[1]);

    const handleMinAge = useCallback((num) => {
        setMinAge(Number(num.target.value));
    }, []);
    const handleMaxAge = useCallback((num) => {
        setMaxAge(Number(num.target.value));
    }, []);

    useEffect(()=>{
        setAgeRangeProgram([minAge, maxAge]);
    }, [minAge, maxAge])
    
    return(
        <>
            <Typography variant="h6" gutterBottom>
                Введите минимальный и максимальный возраст (если мин и макс одно и то же число, укажите его в обоих полях)*:
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="min-age"
                        label="Минимальный"
                        value={minAge}
                        onChange={handleMinAge}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        style={{ width: '20%', margin: '10px'}} 
                    />
                    <TextField
                        id="max-age"
                        label="Максимальный"
                        value={maxAge}
                        onChange={handleMaxAge}
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
export default AgeInterval; 