import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
export const useNewsForm = () => {
    
    const [titleProgram, setTitleProgram] = useState(''); //название образовательной программы
    const [shortTitleProgram, setShortTitleProgram] = useState(''); //укороченное называние образовательной программы
    const [isBudgetProgramm, setIsBudgetProgramm] = useState(true); //бюджетная или платная улслуга (флаг)
    const [linkVideo, setLinkVideo] = useState(''); //ссылка на видео
    const [linkGroup, setLinkGroup] = useState(''); //ссылка на группу в соцсетях

    const [ageRangeProgram, setAgeRangeProgram] = useState([6, 18]); //диапазон возраста (будет минимум и максимум число)
    const [numberStudents, setNumberStudents] = useState([1, 15]); //количество учеников в группе (будет минимум и максимум число)

    const [instructors, setInstructors] = useState([]); //массив учителей (фио, почта, id сферума, ссылка на личную страничку)
    
    const [posterUrl, setPosterUrl] = useState(''); //ссылка на постер (прийдет от сервера, когда загрузится на сервер)  

    const [textProgram, setTextProgram] = useState(''); //текст программы

    //готово
    const [typesProgramm, setTypesProgram] = useState([]); //тип программы классический (экология, программирование, бизнес)
    const [typesProgramKlimov, setTypesProgramKlimov] = useState([]); //тип программы по климову
    
    
    //добавить загрузку pdf файла 
    
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