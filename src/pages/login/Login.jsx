import React from "react";
import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import Header from "../../components/header/Header.jsx"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'; 
import { Navigate } from 'react-router-dom'
import { fetchGetToken } from "./../../store/reducers/auth.js"

import "./Login.css";

export function Login() {
    const isAuth = Boolean(useSelector(state => state.auth.data)); //проверим, выполнена ли авторизация (если да, в стейте будут данные)
    console.log("Авторизация выполнена? ", isAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '222222@mail.ru',
            password: '111111',
        },
        //если не ставить режим, то пока не будет попытки отправить пустые поля, красным выделяться не будет
        //mode: 'onChange', //валидация происходит только если начали писать в форме (происходили какие-либо изменения)
    })
    const onSubmit = async (values) => {
        console.log('То, что передаем на сервер для авторизации', values);
        const data = await dispatch(fetchGetToken(values)); 
        if(!data.payload){
            return alert('Не удалось авторизоваться!');
        }
        if('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    if(isAuth){
        return <Navigate to='/'/>
    }

    return (
        <>
            <Header/>
            <Box className="position">
                <Paper className="root" >
                    <Typography className="root-text" variant="h5" >
                        Вход в аккаунт
                    </Typography>
                    {/* handleSubmit вызовет onSubmit только когда будту поля в форме заполнены кооректно */}
                    <form onSubmit={handleSubmit(onSubmit)}> 
                        <TextField
                            className="field"
                            label="E-Mail"
                            type="email" //стандрартная браузерная валидация (без @ не примет)
                            error={Boolean(errors.email?.message)}  //обводка поля формы красным в случае true
                            helperText={errors.email?.message} //? - узнаем, была ли ошибка, если да то вытаскиваем сообщение об ошибке, которое покажется внизу поля
                            //объясним как будет проходить валидация (просто если пусто, то "укажите почту")
                            { ...register('email', { required: 'укажите почту' })}
                            fullWidth
                        />
                        <TextField 
                            className="field" 
                            label="Пароль" 
                            error={Boolean(errors.password?.message)}  //обводка поля формы красным в случае true
                            helperText={errors.password?.message} //? - узнаем, была ли ошибка,
                            //объясним как будет проходить валидация (просто если пусто, то "укажите пароль")
                            { ...register('password', { required: 'укажите пароль' })}
                            fullWidth 
                        />
                        <Button type="submit" size="large" variant="contained" color="success" fullWidth>
                            Войти
                        </Button>
                    </form>
                </Paper>
            </Box>
        
        </>
    );
};

