import { React, useMemo, useRef, useEffect, useState } from 'react';
import { TextField, Paper, Button, Box, Typography }  from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
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

  const MAX_ALL_IMG = 8;

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
      //console.log("Данные перед отправкой на сервер ", allDataProgram)
      
      if(typesProgramKlimov.length === 0 || typesProgram.length === 0 ||
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
          navigate(`/learn/description_programm/${_id}`); // перейти на страницу созданной или сохраненной программы 
      }
    } catch (err){
      console.warn(err); 
      alert('Проблема с публикацией программы', err); 
    }
  }

  useEffect(() => { // после рендера страницы сразу проверим наличие id, и если он есть - значит происходит редактирование статьи и заполним поля формы данными
    if(isEditingProgram) {
      axiosBase.get(`/programs/${id}`).then(({data}) => {
        //console.log("данные для заполнения полей ", data);

        setTypesProgramKlimov(data.typesProgramKlimov);
        setTypesProgram(data.typesProgram);
        setTitleProgram(data.titleProgram);
        setShortTitleProgram(data.shortTitleProgram);
        setNumLessons(data.numLessons);
        setTrainingPeriod(data.trainingPeriod);
        setLinkVideo(data.linkVideo);
        setCommentVideo(data.commentVideo);
        setLinkGroup(data.linkGroup);
        setCommentProgram(data.commentProgram);
        setIsBudgetProgramm(data.isBudgetProgramm);
        setAgeRangeProgram(data.ageRangeProgram);
        setNumberStudents(data.numberStudents);
        setInstructors(data.instructors);
        setTextProgram(data.textProgram);
        setImageUrl(data.imageUrl);
        setLinkPost(data.linkPosts);
        setFileUrl(data.fileUrl);
        setArrLinkImg(data.arrLinkImg);
      }).catch(err => {
        console.warn(err);
        alert('Ошибка получения программы');
      })   
    }
  }, []);

  return (
    <>
      <HeaderMain/>
      <Paper style={{ padding: 30, marginLeft: 100, marginRight: 100, marginTop: 30 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
            Заполните данные для добавления программы. Обязательные поля отмечены звездочкой.
        </Typography>
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