import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
export const useNewsForm = () => {
    const [imageUrl, setImageUrl] = useState(''); 
    const [text, setText] = useState('');
    const [title, setTitle] = useState(''); //название новости
    const [linkProgramm, setLinkProgramm] = useState('');
    //работа с вводом названия программы и ссылки на нее
    const [programName, setProgramName] = useState('');
    const handleProgramNameChange = useCallback((text) => {
      setProgramName(text.target.value);
    }, []);
    //ввод гиперссылки источника публикации
    const [linkNews, setLinkNews] = useState('');
    const handleLinkNews = useCallback((text) => {
      setLinkNews(text.target.value);
    }, []);

    //работа с датой
    const [dateNews, setDateNews] = useState(null);
    const handleDateChange = (date) => {
        setDateNews(dayjs(date).format('YYYY-MM-DD'));
        //если здесь выводить дату, она не успевает сохраниться в стейт, но она будет сразу после сохранения console.log('Выбрана дата: ', dayjs(dateNews).format('YYYY-MM-DD'));
    };

    const handleLinkProgrammChange = useCallback((text) => {
        setLinkProgramm(text.target.value);
    }, []);

    //сохранение урла изображения
    const onClickRemoveImage = () => {
        setImageUrl(''); //удаляем url изображения
    };

    const handelNameNews = useCallback((text) => {
        setTitle(text.target.value);
    }, []);
    //ввод текста новости
    const handelChangeTextNews = useCallback((text) => {
        setText(text);
    }, []);

    return {
        imageUrl, setImageUrl,
        text, setText,
        title, setTitle,
        linkProgramm, setLinkProgramm,
        programName, setProgramName,
        handleProgramNameChange,
        linkNews, setLinkNews,
        handleLinkNews,
        dateNews, setDateNews,
        handleDateChange,
        handleLinkProgrammChange,
        onClickRemoveImage,
        handelNameNews,
        handelChangeTextNews,
    }
}