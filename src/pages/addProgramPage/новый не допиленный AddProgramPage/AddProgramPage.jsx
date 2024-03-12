import { React, useMemo, useRef, useEffect, useState } from 'react';
import { TextField, Paper, Button, Box, Typography }  from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"; 
import axiosBase from '../../axios';
// import { FormNews } from './FormNews';
import "./AddProgramPage.css"

import HeaderMain from '../../components/headerMain/HeaderMain';
import TypeProgramKlimov from './TypeProgramKlimov.jsx';
import TypeProgram from './TypeProgram.jsx';
import 'easymde/dist/easymde.min.css';
import './AddProgramPage.css'
import MainInput from './MainInput.jsx';
import AgeInterval from './AgeInterval.jsx';
import NumbersStudent from './NumbersStudent.jsx';
import AddInstructor from './AddInstructor.jsx';
import InputTextProgram from './InputTextProgram.jsx';
import ImageUploader from '../../components/upload/ImageUploader/ImageUploader.jsx';
import FileUploader from '../../components/upload/fileUploader/FileUploader.jsx'

import ImageUploaderMany from '../../components/upload/ImageUploaderMany/ImageUploaderMany.jsx';
import ImageGalleryWithDeletion from '../../components/upload/imageGalleryWithDeletion/ImageGalleryWithDeletion.jsx';

import AddLinkPosts from './AddLinkPosts.jsx';
import { fetchRemoveProgram } from '../../store/reducers/programs.js';

export const AddProgramPage = () => {
  const [typesProgramKlimov, setTypesProgramKlimov] = useState([]); //тип программы по климову
  const [typesProgram, setTypesProgram] = useState([]); //тип программы классический (экология, программирование, бизнес)

  const [titleProgram, setTitleProgram] = useState(''); //название образовательной программы
  const [shortTitleProgram, setShortTitleProgram] = useState(''); //укороченное называние образовательной программы
  const [numLessons, setNumLessons] = useState(''); //количество занятий в неделю
  const [trainingPeriod, setTrainingPeriod] = useState(''); //срок обучения по программе
  const [linkVideo, setLinkVideo] = useState(''); //ссылка на видео
  const [commentVideo, setCommentVideo] = useState(''); //примечание к видео
  const [linkGroup, setLinkGroup] = useState(''); //ссылка на группу в соцсетях
  const [commentProgram, setCommentProgram] = useState(''); //примечание к программе
  const [isBudgetProgramm, setIsBudgetProgramm] = useState(true); //бюджетная или платная улслуга (флаг)

  const [ageRangeProgram, setAgeRangeProgram] = useState([6, 18]); //диапазон возраста (будет минимум и максимум число)
  const [numberStudents, setNumberStudents] = useState([1, 15]); //количество учеников в группе (будет минимум и максимум число)
  const [instructors, setInstructors] = useState([]); //массив учителей (фио, почта, id сферума, ссылка на личную страничку)
  const [textProgram, setTextProgram] = useState(''); //текст программы
  const [imageUrl, setImageUrl] = useState(''); //ссылка на постер (прийдет от сервера, когда загрузится на сервер)  
  const [linkPosts, setLinkPost] = useState([]); 
  const [fileUrl, setFileUrl] = useState(''); 
  const [arrLinkImg, setArrLinkImg] = useState([]); 

  const [isDeletingProgram, setIsDeletingProgram] = useState(false);

  const MAX_ALL_IMG = 8;

  const dispatch = useDispatch();

  const isAuth = Boolean(useSelector(state => state.auth.data)); //проверим, выполнена ли авторизация (если да, в стейте будут данные)
  const navigate = useNavigate(); 
  if(!window.localStorage.getItem('token') && !isAuth) { //Перейти на главную страницу</Link>; //если мы не авторизованы, то перейдем на главную страницу
    navigate("/"); // перейти на главную страницу
    return null; // или возвращайте null после перенаправления
  }

  //const inputFileRef = useRef(null); //для переноса клика с кнопки на input
  const { id } = useParams(); 
  const isEditingProgram = Boolean(id); //то есть если есть id, значит 

  //отправка данных на сервер
  const onSubmit = async () => {
    try {
      //готовим объект для отправки на сервер
      const allDataProgram = {
        typesProgramKlimov,
        typesProgram,
        titleProgram,
        shortTitleProgram,
        numLessons,
        trainingPeriod,
        linkVideo,
        commentVideo,
        linkGroup,
        isBudgetProgramm,
        commentProgram,
        ageRangeProgram,
        numberStudents,
        instructors,
        textProgram,
        imageUrl,
        linkPosts,
        fileUrl,
        arrLinkImg
      }
      console.log("Данные перед отправкой на сервер ", allDataProgram)
      
      if(isDeletingProgram){
        await axiosBase.patch(`/program/${id}`);
      }
      else if(typesProgramKlimov.length === 0 || typesProgram.length === 0 ||
        typesProgram === "" || shortTitleProgram === "" ||
        shortTitleProgram === "" || numLessons === "" || trainingPeriod === "" ||
        ageRangeProgram.length === 0 || numberStudents.length === 0 ||
        instructors.length === 0 || textProgram === "" || imageUrl=== "") {
          alert("Не все обязательные поля, отмеченные *, заполнены!")
      } else{
          //проверяем, редактируется ли программа или заново создается 
          const { data } = isEditingProgram 
          ? await axiosBase.patch(`/program/${id}`, allDataProgram) : await axiosBase.post('/program', allDataProgram); 
          const _id = isEditingProgram ? id : data._id; //записываем в _id то же самое значение, если редактируем, 
                                                 //а иначе получаем новый от сервера, если программа создается с нуля
          //navigate(`/learn/description_programm/${_id}`); // перейти на страницу созданной или сохраненной программы 
      }
    } catch (err){
      console.warn(err); 
      alert('Проблема с публикацией программы', err); 
    }
  }

  useEffect(() => {
    if (isEditingProgram && !isDeletingProgram) {
        axiosBase.get(`/programs/${id}`)
            .then(({ data }) => {
                // Устанавливаем только те данные, которые еще не были обновлены после удаления программы
                setTypesProgramKlimov(prevState => prevState.length === 0 ? data.typesProgramKlimov : prevState);
                setTypesProgram(prevState => prevState.length === 0 ? data.typesProgram : prevState);
                setTitleProgram(prevState => prevState === '' ? data.titleProgram : prevState);
                setShortTitleProgram(prevState => prevState === '' ? data.shortTitleProgram : prevState);
                setNumLessons(prevState => prevState === '' ? data.numLessons : prevState);
                setTrainingPeriod(prevState => prevState === '' ? data.trainingPeriod : prevState);
                setLinkVideo(prevState => prevState === '' ? data.linkVideo : prevState);
                setCommentVideo(prevState => prevState === '' ? data.commentVideo : prevState);
                setLinkGroup(prevState => prevState === '' ? data.linkGroup : prevState);
                setCommentProgram(prevState => prevState === '' ? data.commentProgram : prevState);
                setIsBudgetProgramm(prevState => prevState === '' ? data.isBudgetProgramm : prevState);
                setAgeRangeProgram(prevState => prevState.length === 0 ? data.ageRangeProgram : prevState);
                setNumberStudents(prevState => prevState.length === 0 ? data.numberStudents : prevState);
                setInstructors(prevState => prevState.length === 0 ? data.instructors : prevState);
                setTextProgram(prevState => prevState === '' ? data.textProgram : prevState);
                setImageUrl(prevState => prevState === '' ? data.imageUrl : prevState);
                setLinkPost(prevState => prevState.length === 0 ? data.linkPosts : prevState);
                setArrLinkImg(prevState => prevState.length === 0 ? data.arrLinkImg : prevState);
            console.log("Данные для редактирования ", data);
            })
            .catch(err => {
                console.warn(err);
                alert('Ошибка получения программы');
            });
    }
  }, [isEditingProgram, id, isDeletingProgram]);

  const handleRemoveProgram = async () => {
    if (!confirm("Вы действительно хотите удалить программу")) {
        return; // Если пользователь отказался удалить программу, прерываем операцию
    }
    try {
        // Удаление постера программы из imageUrl
        if (imageUrl !== "") {
            try {
                await axiosBase.delete(imageUrl);
                setImageUrl("");
                //console.log('Постер успешно удален');
            } catch (err) {
                console.error('Ошибка при удалении изображения: ', err);
                throw new Error('Произошла ошибка при удалении изображения');
            }
        }
        // Удаление всех фото из массива arrLinkImg
        if (arrLinkImg.length > 0) {
            try {
                await Promise.all(arrLinkImg.map(async imageUrl => {
                    try {
                        await axiosBase.delete(imageUrl);
                        console.log('Фото успешно удалено с адресом ', imageUrl);
                    } catch (err) {
                        console.error('Ошибка при удалении фото: ', err);
                        throw new Error('Произошла ошибка при удалении фото');
                    }
                }));

                // Опустошаем массив после успешного удаления всех изображений
                setArrLinkImg([]);
                //console.log('Массив ссылок на изображения опустошен');
            } catch (error) {
                console.error('Произошла ошибка при удалении фотографий:', error.message);
                // Вы можете выбрать, как обрабатывать ошибку удаления фотографий здесь
                // Например, можно выбросить исключение и прервать удаление остальных файлов и программы из БД
                throw new Error('Произошла ошибка при удалении фотографий');
            }
        } else {
            console.log('Массив ссылок на изображения пуст.');
        }

        // Удаление файла
        if (fileUrl !== "") {
            try {
                console.log('Путь для удаления файла ', fileUrl);
                await axiosBase.delete(fileUrl);
                setFileUrl("");
                //console.log('Файл успешно удален');
            } catch (err) {
                console.error('Ошибка при удалении файла: ', err);
                throw new Error('Произошла ошибка при удалении файла');
            }
        }

        // Устанавливаем флаг удаления программы перед отправкой остальных данных на сервер
        setIsDeletingProgram(true);

    } catch (error) {
        console.error('Произошла ошибка при удалении файлов и программы из БД:', error.message);
        alert(error.message);
    }
  };

  // Добавляем useEffect, который будет вызываться только при изменении флага isDeletingProgram
  useEffect(() => {
      if (isDeletingProgram) {
          // Установите время задержки (например, 5000 миллисекунд)
          const delay = 1000;
          // Отправка остальных данных на сервер с задержкой после завершения всех асинхронных операций
          setTimeout(async () => {
              console.log('Состояние перед отправкой данных на сервер:', imageUrl, arrLinkImg, fileUrl);
              await onSubmit();
              // После отправки данных сбрасываем флаг удаления программы
              // Удаление программы из БД после удаления всех файлов
              dispatch(fetchRemoveProgram(idCard));
              setIsDeletingProgram(false);
          }, delay);
      }
  }, [isDeletingProgram]);

  return (
    <>
      <HeaderMain/>
      <Paper style={{ padding: 30, marginLeft: 100, marginRight: 100, marginTop: 30 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
            Заполните данные для добавления программы. Обязательные поля отмечены звездочкой.
        </Typography>
        {isEditingProgram && (
        <Box sx={{display: "flex", justifyContent: "end"}}>
          <Button 
              variant="contained" 
              color="error" 
              onClick={handleRemoveProgram}
              sx={{marginRight: "20px"}}
          >
              Удалить программу
          </Button>
        </Box>
        )}
        <MainInput 
          titleProgram={titleProgram} setTitleProgram={setTitleProgram} 
          shortTitleProgram={shortTitleProgram} setShortTitleProgram={setShortTitleProgram}  
          numLessons={numLessons} setNumLessons={setNumLessons}
          trainingPeriod={trainingPeriod} setTrainingPeriod={setTrainingPeriod}
          linkVideo={linkVideo} setLinkVideo={setLinkVideo} 
          linkGroup={linkGroup} setLinkGroup={setLinkGroup} 
          commentVideo={commentVideo} setCommentVideo={setCommentVideo}
          isBudgetProgramm={isBudgetProgramm} setIsBudgetProgramm={setIsBudgetProgramm}
          commentProgram={commentProgram} setCommentProgram={setCommentProgram}
        />
        <AgeInterval ageRangeProgram={ageRangeProgram} setAgeRangeProgram={setAgeRangeProgram}/>
        <NumbersStudent numberStudents={numberStudents} setNumberStudents={setNumberStudents} /> 
        <TypeProgramKlimov typesProgramKlimov={typesProgramKlimov} setTypesProgramKlimov={setTypesProgramKlimov}/>
        <TypeProgram typesProgram={typesProgram} setTypesProgram={setTypesProgram}/>
        <AddInstructor instructors={instructors} setInstructors={setInstructors}/>
        <InputTextProgram textProgram={textProgram} setTextProgram={setTextProgram}/>
        <AddLinkPosts linkPosts={linkPosts} setLinkPost={setLinkPost} />

        <Typography variant="h6" gutterBottom>
            Загрузить постер образовательной программы*:
        </Typography>
        <ImageUploader url={'uploads_news_image_poster'} folder={'postersPrograms'} imageUrl={imageUrl} setImageUrl={setImageUrl}/>    

        <Typography variant="h6" gutterBottom>
            Загрузите изрображения (как проходят занятия) только в горизонтальном фаормате 1-8 шт:
        </Typography>

        <ImageUploaderMany url={'uploads_image_program'} folder={'programImage'} setArrLinkImg={setArrLinkImg} maxNumImage={MAX_ALL_IMG} arrLinkImg={arrLinkImg}/>

        <ImageGalleryWithDeletion imageUrls={arrLinkImg} setArrLinkImg={setArrLinkImg}/> 

        <Typography variant="h6" gutterBottom>
            Загрузить файл образовательной программы:
        </Typography>
        <FileUploader url={'uploads_file_program'} folder={'programFile'} fileUrl={fileUrl} setFileUrl={setFileUrl}/>
        <Box className="buttons" sx={{marginTop: '20px', display: "flex", justifyContent: "flex-end"}}>
          <Button 
            onClick={() => onSubmit()}           
            size="large" 
            ariant="contained"
            variant="outlined"
          >
            {isEditingProgram ? "Сохранить" : "Создать"}
          </Button>
          <a href="/">
            <Button size="large" variant="outlined">Отмена</Button>
          </a>
        </Box>
      </Paper>
    </>
  );
};