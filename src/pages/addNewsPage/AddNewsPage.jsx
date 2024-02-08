import { React, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axiosBase from '../../axios';

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

  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef(null); //для переноса клика с кнопки на input

  const { id } = useParams(); 
  const isEditingNews = Boolean(id); //то есть если есть id, значит 

  console.log({title, text}); //проверим, чтоы сохраняются ли введенные данные 

  //функция для проверки изменения хранилища для изображения
  const handleChangeImg = async (e) => {
    try{
      console.log(e.target.files); //увидим информацию о загруженном файле
      const imgData = new FormData(); //формат хранилища для изображения для отправки его потом на бэкенд
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

  const onClickRemoveImage = () => {
    setImageUrl(''); //удаляем url изображения
  };

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
      const allDataNews = {
        title,
        imageUrl, 
        text
      }
      
      const { data } = isEditingNews 
      ? await axiosBase.patch(`/news/${id}`, allDataNews) : await axiosBase.post('/news', allDataNews) 

      const _id = isEditingNews ? id : data._id; //записываем в _id то же самое значение, если редактируем, 
                                                 //а иначе получаем новый от сервера, если статья создается с нуля



      //ЗДЕСЬ МОЖНО СДЕЛАТЬ ПЕРЕХОД ПРЯМ НА ОТДЕЛЬНУЮ СТРАНИЦУ НОВОСТИ, ТАК БУДЕТ КАК РАЗ ДЛЯ ОБРАЗОВАТЕЛЬНОЙ ПРОГРАММЫ
      // по наличию id поймем, создана статья или нет
      //console.log('id созданной статьи ', data._id); 
      //console.log('urlImg созданной статьи ', data); 
      //НО Я ПОКА СДЕЛАЮ ПЕРЕХОД В РАЗДЕЛ ИСТОРИЯ УСПЕХА
      navigate("/news"); // перейти на главную страницу
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
        <Button 
          onClick={() => inputFileRef.current.click()}
          variant="outlined" 
          size="large"
        >
          Загрузить превью
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