import { React, useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux'; 
import { fetchRemoveNews } from '../../store/reducers/news';
import { Box, Typography, IconButton, CardMedia, Link, Button } from "@mui/material";
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
        <CardMedia
          component="img"
          alt={title}
          src={imageUrl}
        />
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