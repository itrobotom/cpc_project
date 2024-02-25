import { React, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { TextField, Paper, Button, Box, Typography }   from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FilterTypeProgramm } from '../../components/filters/FilterTypeProgram';

export const FormNews = ({dateNews, handleDateChange, programName, handleProgramNameChange, linkProgramm, handleLinkProgrammChange, linkNews, handleLinkNews}) => {


    return(
        <>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Тема новости (по типу программы: техническая, и тд):
                </Typography>
                <FilterTypeProgramm />
            </Box>

            <Box style={{ marginTop: 30, marginBottom: 30 }}>
                <Typography variant="h6" gutterBottom>
                    Дата события:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker value={dateNews} onChange={handleDateChange} />
                </LocalizationProvider>
            </Box>
            
            <Box>
                <Typography variant="h6" gutterBottom>
                    Название образовательной программы:
                </Typography>
            <TextField
                id="program-name"
                label="Введите название программы"
                value={programName}
                onChange={handleProgramNameChange}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Typography variant="h6" gutterBottom>
                Гиперссылка на образовательную программу:
            </Typography>
            <TextField
                id="linkProgramm"
                label="Введите гиперссылку на образовательную программу"
                value={linkProgramm}
                onChange={handleLinkProgrammChange}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            </Box>

            <Box>
            <Typography variant="h6" gutterBottom>
                Гиперссылка на источник новости:
            </Typography>
            <TextField
                id="hyperlink"
                label="Введите гиперссылку на новость"
                value={linkNews}
                onChange={handleLinkNews}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            </Box>
        </>
    )
}