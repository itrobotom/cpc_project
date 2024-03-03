import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material'; 

const selectTypeProgram = [
    "технические направления и инженерия", 
    "гуманитарные и социальные",
    "естественно-научные", 
    "искусство и дизайн", 
    "экономика и бизнес", 
    "патриотические", 
    "иностранные языки", 
    "экология и окружающая среда",
    "программирование"];
   
const TypeProgram = ({typesProgram, setTypesProgram}) => {
    const handleTypeToggle = (type) => () => {
        const currentIndex = typesProgram.indexOf(type);
        const newSelectedTypes = [...typesProgram];

        if (currentIndex === -1) {
            newSelectedTypes.push(type);
        } else {
            newSelectedTypes.splice(currentIndex, 1);
        }

        setTypesProgram(newSelectedTypes);
    };

    return (
        <Box mt={2} mb={2}>
            <Typography variant="h6" gutterBottom>
                Тип программы*:
            </Typography>
            {selectTypeProgram.map((type) => (
                <FormControlLabel
                    key={type}
                    control={
                        <Checkbox
                            checked={typesProgram.indexOf(type) !== -1}
                            onChange={handleTypeToggle(type)}
                            name={type}
                        />
                    }
                    label={type}
                />
            ))}
        </Box>
    );
};

export default TypeProgram;