import { React, useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux'; 
import { fetchRemoveNews } from '../../store/reducers/news';
import { Box, Typography, IconButton, CardMedia, Link, Button, Skeleton, Fade } from "@mui/material";
import dayjs from 'dayjs';

import Markdown from 'react-markdown'

const MIN_SYMBOL_COUNT = 300; 
export const CardNews = ({
  id,
  title,
  imageUrl,
  isFullPost,
  isLoading,
  isEditable,
  textNews,
  dateNewsFormat,
  linkProgramm,
  linkNews,
  programName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const dispatch = useDispatch();
  const onClickRemove = () => {
    confirm("Вы действительно хотите удалить новость") && dispatch(fetchRemoveNews(id));
  };

  //отслеживание загрузки изображения в браузере (не с сервера)
  const [loadedImg, setLoadedImg] = useState(false);
  //уменьшаем изображение, если оно вериткальное 
  const [imageWidth, setImageWidth] = useState("100%");
  const handleImageLoad = (event) => {
    setLoadedImg(true);
    const { naturalWidth, naturalHeight } = event.target;
    if (naturalHeight > naturalWidth) {
      setImageWidth("50%"); // Если изображение вертикальное, делаем 50% ширины текста
    } else {
      setImageWidth("100%"); // Обычная ширина
    }
  };


  // Проверяем, загружено ли изображение
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setLoadedImg(true);
      if (img.naturalHeight > img.naturalWidth) {
        setImageWidth("50%");
      } else {
        setImageWidth("100%");
      }
    };
  }, [imageUrl]);

  const [isLongText, setIsLongText] = useState(false);
  useEffect(() => {
    setIsLongText(textNews.length > MIN_SYMBOL_COUNT); // Предположим, что длинный текст имеет более 100 символов
  }, [textNews]);

  const dateNewsFormatString = dayjs(dateNewsFormat).format('MM.YYYY'); //записываем дату в удобном формате 
  return (
    <div>
      {isEditable && (
        <Box style={{ textAlign: "right" }}>
          <a href={`/news/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>  
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <Typography ml='0px' color="#000000" variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>{title}</Typography>
      {imageUrl && (
        <>
          {!loadedImg && <Skeleton variant="rectangular" width="100%" height={300} />} 
          {loadedImg && (
            <Fade in={loadedImg} timeout={500}>
              <CardMedia
                component="img"
                alt={title}
                src={imageUrl}
                onLoad={handleImageLoad} 
                sx={{ width: imageWidth, display: "block", margin: "0 auto" }} 
              />
            </Fade>
          )}
        </>
      )}
      <div>
        <Typography 
          style={{ 
            fontSize: '20px', 
            textAlign: 'justify', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            display: '-webkit-box', 
            WebkitLineClamp: isExpanded ? 'unset' : '8', 
            WebkitBoxOrient: 'vertical' 
          }}>
          <Markdown>{textNews}</Markdown>
          {programName && linkProgramm ? ( // Если не будет названия программы, то поле будет пустое, если не будет гиперссылки, то отобразится только название
            <Typography>
              Занятия проводятся по образовательной программе:{" "}
              <a href={linkProgramm} target="_blank" rel="noopener noreferrer">
                {programName}
              </a>
            </Typography>
          ) : programName ? (
            <Typography
              style={{ 
                fontSize: '20px', 
              }}
            >
              Подготовка ведется по образовательной программе: <b>{programName}</b>
            </Typography>
          ) : null}
          
          {linkNews && (
            <Typography style={{ textAlign: "right" }}>
              <a href={linkNews} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none'}}>
                <b>Подробнее в источнике</b>
              </a>
            </Typography>
          )}
          {dateNewsFormat && (
            <Typography
              sx={{textAlign: 'right'}}
            >
              {dateNewsFormatString}
            </Typography>
          )}
        </Typography>
        {!isExpanded && isLongText &&(
          <Box style={{ textAlign: "right" }}>
            <Button onClick={handleToggleExpand}>
              читать далее...
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};