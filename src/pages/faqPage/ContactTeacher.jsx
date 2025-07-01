import { Container, Typography, Button, Box, InputLabel, MenuItem, FormControl, Select, useMediaQuery } from '@mui/material';

import React, { useState, useEffect } from 'react';

import { fetchPrograms } from '../../store/reducers/programs';
import { useSelector, useDispatch } from "react-redux";


export const ContactTeacher = () => {
    const [titleProgram, setTitleProgram] = useState('');
    const [accountId, setAccountId] = useState('');

    const handleClickChat = () => {
        if (accountId !== "") {
            window.open(`https://web.vk.me/convo/${accountId}`, '_blank');
        } else {
            alert("К сожалению, нет возможности связаться с педагогом");
        }
    } 

    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChange = (event) => {
        setTitleProgram(event.target.value); //делаетсят олько для перерендера и отображения нового значения в выпадающем меню
        const selectedTitleProgram = event.target.value;
        // Найти объект программы по названию программы
        const selectedProgram = programs.items.find(program => program.titleProgram === selectedTitleProgram);
        // Если программа найдена, извлечь accountId
        if (selectedProgram) {
            const selectedAccountId = selectedProgram.instructors[0].accountId;
            console.log("id чата", selectedAccountId);
            // Теперь вы можете использовать selectedAccountId для дальнейших действий
            setAccountId(selectedAccountId);
        }
    };
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPrograms());
    }, []); // Запускаем запрос при изменении статуса аутентификации

    const { programs } = useSelector((state) => state.programs); // Все программы объектом
    const isLoadingPrograms = programs.status === 'loading';
    console.log("Все программы ", programs);

    const handleChatRedirect = () => {
        // Здесь вы можете использовать значение accountId для перехода в чат
        console.log("Переход в чат с пользователем", accountId);
    };

    return (
        <Container>
            <Box style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                <Typography variant="h4" gutterBottom>
                    Связь через Сферум с педагогами, ответственными за программы
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Выберете интересующую образовательную программу, перейдите по ссылке в чат с педагогом и задайте свой вопрос. 
                </Typography>
            </Box>
            <Box style={{paddingBottom: "20px", display: "flex", justifyContent: "center" }}>
                <Box sx={{ flex: 1, marginRight: "20px", maxWidth: isMobile ? 300 : 800 }}> {/* Используем flex-grow и maxWidth */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Образовательная программа</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={titleProgram}
                            label="Образовательная программа"
                            onChange={handleChange}
                            sx={{ minWidth: 200 }} // Минимальная ширина, чтобы предотвратить слишком сильное сжатие
                        >
                            {programs.items.map((program) => (
                                // value={program.instructors[0].accountId}>
                                <MenuItem key={program.id} value={program.titleProgram}>
                                    {program.titleProgram}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button 
                    variant="outlined"
                    onClick={handleClickChat}
                >
                    Перейти в чат
                </Button>
            </Box>
            <Box style={{ paddingBottom: "30px" }}>
                <Typography variant="h6" gutterBottom>
                    Примечание: при переходе в чат вы должны быть авторизованы в Сферум. 
                </Typography>
            </Box>
        </Container>
    );
}