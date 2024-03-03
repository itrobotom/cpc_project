import { React, useMemo, useRef, useEffect } from 'react';
import { TextField, Paper, Button, Box }   from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axiosBase from '../../axios';
import { FormNews } from './FormNews';

import HeaderMain from '../../components/headerMain/HeaderMain';
import 'easymde/dist/easymde.min.css';
import './AddNewsPage.css'
import { useNewsForm } from './useNewsForm';

import ImageUploader from '../../components/ImageUploader/ImageUploader';

export const AddNewsPage = () => {
  const { //данные формы
    imageUrl, setImageUrl,
        text, setText,
        title, setTitle,
        linkProgramm, setLinkProgramm,
        programName, setProgramName,
        handleProgramNameChange,
        linkNews, setLinkNews,
        handleLinkNews,
        dateNews,
        handleDateChange,
        handleLinkProgrammChange,
        onClickRemoveImage,
        handelNameNews,
        handelChangeTextNews,
  } = useNewsForm();

  const isAuth = Boolean(useSelector(state => state.auth.data)); //проверим, выполнена ли авторизация (если да, в стейте будут данные)
  const navigate = useNavigate(); 
  //const inputFileRef = useRef(null); //для переноса клика с кнопки на input
  const { id } = useParams(); 
  const isEditingNews = Boolean(id); //то есть если есть id, значит 
  //console.log({title, text}); //проверим, чтобы сохраняются ли введенные данные 
  const typesProgramStore = useSelector(state => state.valueFilters.type); //устанавливаем тип новости при добавлении ее 



  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '350px',
      autofocus: true,
      placeholder: 'Введите текст статьи',
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
      //console.log("data", allDataNews)
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
        <FormNews 
          dateNews = {dateNews}
          handleDateChange = {handleDateChange} 
          programName = {programName}
          handleProgramNameChange = {handleProgramNameChange}
          linkProgramm = {linkProgramm} 
          handleLinkProgrammChange = {handleLinkProgrammChange}
          linkNews = {linkNews}
          handleLinkNews = {handleLinkNews}
        />

        <ImageUploader setImageUrl = {setImageUrl} url={'uploads_news_image'} folder={'newsImage'}/>
        
        {/* проверка наличия ссылки на изображение и добавления удаления, если оно есть (если есть ссылки, ести и изображение) */}
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <Box mt={2}>
              <img className="image-poster" src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
            </Box>
          </>
          
        )}
        <br />
        <br />
        <Box>
          <TextField
            id="hyperlink"
            label="Введите заголовок статьи"
            value={title}
            onChange={handelNameNews}
            fullWidth
            variant="standard"
            margin="normal"
          />
        </Box>

        <SimpleMDE className="editor" value={text} onChange={handelChangeTextNews} options={options} />
        <div className="buttons">
          <Button 
            onClick={() => dateNews ? onSubmit() : alert("Введите дату события")}           
            size="large" 
            ariant="contained"
          >
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