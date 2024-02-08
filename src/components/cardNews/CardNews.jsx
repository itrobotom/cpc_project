import React from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchRemoveNews } from '../../store/reducers/news';
import { Box, Typography, IconButton, CardMedia, Link } from "@mui/material";

import styles from './CardNews.css';
import Markdown from 'react-markdown'

export const CardNews = ({
  id,
  title,
  createdAt,
  imageUrl,
  children,
  isFullPost,
  isLoading,
  isEditable, //если true - значит авторизован и есть возможность редактировать статью 
  textNews
}) => {
  // if (isLoading) {
  //   return <PostSkeleton />;
  // }
  const dispatch = useDispatch();
  const onClickRemove = () => {
    dispatch(fetchRemoveNews(id))
  };

  console.log('Т.к. авторизация пройдена, можно редактировать статью', isEditable);
  return (
    <div>
      {isEditable && (
        <div>
          <a href={`/news/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>  
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Typography ml='0px' color="#000000" variant="h4" gutterBottom>{title}</Typography>
      {imageUrl && (
        <CardMedia
          component="img"
          alt={title}
          src={imageUrl}
          // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        />
      )}
      <Typography style={{ fontSize: '20px', width: '100%', textAlign: 'justify' }}>
        <Markdown>{textNews}</Markdown>
      </Typography>
      <Typography>{createdAt}</Typography>
    </div>
  );
};
