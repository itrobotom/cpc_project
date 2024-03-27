import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import {TextField, IconButton, Button, Box, Typography} from "@mui/material";

const AddInstructor = ({ instructors, setInstructors }) => {
    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        const updatedInstructors = [...instructors];
        updatedInstructors[index] = {
            ...updatedInstructors[index],
            [field]: value
        };
        setInstructors(updatedInstructors);
    };

    const handleAddInstructor = () => {
        setInstructors([...instructors, { name: '', email: '', accountId: '', link: '' }]);
    };

    const handleRemoveInstructor = (index) => {
        const updatedInstructors = [...instructors];
        updatedInstructors.splice(index, 1);
        setInstructors(updatedInstructors);
    };

    return (
        <div>
            <Typography
                variant="h6" gutterBottom
            >
                Добавить педагога(ов) (всех, кто преподает данную программу):*
            </Typography>
            {instructors.map((instructor, index) => (
                <Box 
                    key={index}
                    sx={{textAlign: 'left'}}
                >
                    <TextField
                        label="ФИО*"
                        value={instructor.name || ''}
                        onChange={(event) => handleInputChange(event, index, 'name')}
                        style={{ width: '30%', margin: '10px' }} 
                    />
                    <TextField
                        label="Почта (пропускаем заполнение)"
                        value={instructor.email || ''}
                        onChange={(event) => handleInputChange(event, index, 'email')}
                        style={{ width: '20%', margin: '10px' }} 
                        disabled // Делает поле неактивным, пока почту не собираем
                    />
                    <TextField
                        label="ID аккаунта"
                        value={instructor.accountId || ''}
                        onChange={(event) => handleInputChange(event, index, 'accountId')}
                        style={{ width: '10%', margin: '10px' }} 
                    />
                    <TextField
                        label="Ссылка на персональную страницу с cpc.tomsk.ru"
                        value={instructor.link || ''}
                        onChange={(event) => handleInputChange(event, index, 'link')}
                        style={{ width: '25%', margin: '10px' }} 
                    />
                    {/* <Button onClick={() => handleRemoveInstructor(index)}>Удалить</Button> */}
                    <IconButton onClick={() => handleRemoveInstructor(index)} style={{ marginTop: "17px" }} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={handleAddInstructor}>Добавить педагога</Button>
        </div>
    );
};

export default AddInstructor;