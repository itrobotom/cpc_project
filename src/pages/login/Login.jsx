import React from "react";
import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import Header from "../../components/header/Header.jsx"

import "./Login.css";

export function Login() {
  return (
    <>
        <Header/>
        <Box className="position">
            <Paper className="root" >
                <Typography className="root-text" variant="h5" >
                    Вход в аккаунт
                </Typography>
                <TextField
                    className="field"
                    label="E-Mail"
                    error
                    helperText="Неверно указана почта"
                    fullWidth
                />
                <TextField className="field" label="Пароль" fullWidth />
                <Button size="large" variant="contained" color="success" fullWidth>
                    Войти
                </Button>
            </Paper>
        </Box>
        
    </>
  );
};
