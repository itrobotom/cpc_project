import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material'; 

const selectTypeKlimovProgram = [
    "Человек-природа",
    "Человек-техника",
    "Человек-человек",
    "Человек-знаковая система",
    "Человек-художественный образ",
];

const TypeProgramKlimov = ({typesProgramKlimov, setTypesProgramKlimov}) => {
    const handleTypeToggle = (type) => () => {
        const currentIndex = typesProgramKlimov.indexOf(type);
        const newSelectedTypes = [...typesProgramKlimov];

        if (currentIndex === -1) {
            newSelectedTypes.push(type);
        } else {
            newSelectedTypes.splice(currentIndex, 1);
        }

        setTypesProgramKlimov(newSelectedTypes);
    };

    return (
        <Box mt={2} mb={2}>
            <Typography variant="h6" gutterBottom>
                Типы программы по Климову*:
            </Typography>
            {selectTypeKlimovProgram.map((type) => (
                <FormControlLabel
                    key={type}
                    control={
                        <Checkbox
                            checked={typesProgramKlimov.indexOf(type) !== -1}
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

export default TypeProgramKlimov;