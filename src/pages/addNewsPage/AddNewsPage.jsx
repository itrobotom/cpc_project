import { React, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { TextField, Paper, Button, Box, Typography }   from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SimpleMDE from 'react-simplemde-editor';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axiosBase from '../../axios';

import { FilterTypeProgramm } from '../../components/filters/FilterTypeProgram';

// import Header from "../../components/header/Header.jsx"
import HeaderMain from '../../components/headerMain/HeaderMain';
import 'easymde/dist/easymde.min.css';
//import styles from './AddPost.module.scss';
import './AddNewsPage.css'
export function AddNewsPage() {
  const isAuth = Boolean(useSelector(state => state.auth.data)); //проверим, выполнена ли авторизация (если да, в стейте будут данные)
  const navigate = useNavigate(); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [linkProgramm, setLinkProgramm] = useState('');
  //работа с вводом названия программы и ссылки на нее
  const [programName, setProgramName] = useState('');
  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };
  //ввод гиперссылки источника публикации
  const [linkNews, setLinkNews] = useState('');
  const handleLinkNews = (event) => {
    setLinkNews(event.target.value);
  }

  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef(null); //для переноса клика с кнопки на input

  const { id } = useParams(); 
  const isEditingNews = Boolean(id); //то есть если есть id, значит 

  console.log({title, text}); //проверим, чтоы сохраняются ли введенные данные 

  const typesProgramStore = useSelector(state => state.valueFilters.type); //устанавливаем тип новости при добавлении ее 

  //работа с датой
  const [dateNews, setDateNews] = useState(null);
  const handleDateChange = (date) => {
    setDateNews(dayjs(date).format('YYYY-MM-DD'));
    //если здесь выводить дату, она не успевает сохраниться в стейт, но она будет сразу после сохранения console.log('Выбрана дата: ', dayjs(dateNews).format('YYYY-MM-DD'));
  };


  const handleLinkProgrammChange = (event) => {
    setLinkProgramm(event.target.value);
  };


  //функция для проверки изменения хранилища для изображения
  const handleChangeImg = async (e) => {
    try{
      console.log(e.target.files); //увидим информацию о загруженном файле
      const imgData = new FormData(); //формат хранилища для изображения для отправки его на бэкенд и ниже сразу это делаем
      const img = e.target.files[0];
      console.log('formData ', img);
      imgData.append('image', img); 
      const { data } = await axiosBase.post('/upload', imgData)
      console.log('Ссылка на загруженный на сервер картинки ', data.url);
      setImageUrl(data.url);
    } catch(err){
      console.warn(err); 
      alert('Ошибка при загрузке изображения');
    }
  };

  //сохранение урла изображения
  const onClickRemoveImage = () => {
    setImageUrl(''); //удаляем url изображения
  };

  //ввод текста новости
  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '350px',
      autofocus: true,
      placeholder: 'Введите текст статьи...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if(!window.localStorage.getItem('token') && !isAuth) { //Перейти на главную страницу</Link>; //если мы не авторизованы, то перейдем на главную страницу
    navigate("/"); // перейти на главную страницу
    return null; // или возвращайте null после перенаправления
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log("Вот готовый к отправке URL ", imageUrl)
      //отформатируем дату день.мес.год
      //const dateNewsFormat = dayjs(dateNews).format('DD.MM.YYYY')
      const dateNewsFormat = dateNews;
      //готовим объект для отправки на сервер
      const allDataNews = {
        title,
        imageUrl, 
        text,
        programName,
        typesProgramStore,
        dateNewsFormat,
        linkProgramm,
        linkNews,
      }
      console.log("data", allDataNews)
      
      const { data } = isEditingNews 
      ? await axiosBase.patch(`/news/${id}`, allDataNews) : await axiosBase.post('/news', allDataNews) 

      const _id = isEditingNews ? id : data._id; //записываем в _id то же самое значение, если редактируем, 
                                                 //а иначе получаем новый от сервера, если статья создается с нуля

      //ЗДЕСЬ МОЖНО СДЕЛАТЬ ПЕРЕХОД ПРЯМ НА ОТДЕЛЬНУЮ СТРАНИЦУ НОВОСТИ, ТАК БУДЕТ КАК РАЗ ДЛЯ ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЫ
      // по наличию id поймем, создана статья или нет
      navigate("/news"); // перейти на страницу история успеха
    } catch (err){
      console.warn(err); 
      alert('Проблема с публикацией статьи', err); 
    }
  }

  useEffect(() => { // после рендера страницы сразу проверим наличие id, и если он есть - значит происходит создание статьи и заполним поля формы данными
    if(isEditingNews) {
      axiosBase.get(`/news/${id}`).then(({data}) => {
        console.log('1111', data);
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
        setProgramName(data.programName);
        setLinkProgramm(data.linkProgramm);
        setLinkNews(data.linkNews);
        



      }).catch(err => {
        console.warn(err);
        alert('Ошибка получения статьи');
      })   
    }
  }, []);

  return (
    <>
      <HeaderMain/>
      <Paper style={{ padding: 30, marginLeft: 100, marginRight: 100, marginTop: 30 }}>
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
            {/* <div>Выбранная дата: {dateNews ? dayjs(dateNews).format('YYYY-MM-DD') : 'Нет выбранной даты'}</div> */}
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

        <Button 
          onClick={() => inputFileRef.current.click()}
          variant="outlined" 
          size="large"
        >
          Загрузить изображение
        </Button>
        <input 
          ref={inputFileRef}
          type="file" 
          onChange={handleChangeImg} 
          hidden //скрыть на странице элемент
        />
        {/* проверка наличия ссылки на изображение и добавления удаления, если оно есть (если есть ссылки, ести и изображение) */}
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className="image" src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
          </>
          
        )}

        <br />
        <br />
        <TextField
          className="title"
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <TextField className="tags" variant="standard" placeholder="Тэги" fullWidth /> */}
        <SimpleMDE className="editor" value={text} onChange={onChange} options={options} />
        <div className="buttons">
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditingNews ? "Сохранить" : "Опубликовать"}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </Paper>
    </>
  );
};