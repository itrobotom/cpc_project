import React from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import { Box, Typography, IconButton, CardMedia, Link } from "@mui/material";

import styles from './CardNews.css';

export const CardNews = ({
  _id,
  title,
  createdAt,
  imageUrl,
  children,
  isFullPost,
  isLoading,
  isEditable,
  textNews
}) => {
  // if (isLoading) {
  //   return <PostSkeleton />;
  // }

  const onClickRemove = () => {};

  return (
    <div>
      {isEditable && (
        <div>
          <a href={`/posts/${_id}/edit`}>
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
      <Typography style={{ fontSize: '20px', width: '100%', textAlign: 'justify' }}>{textNews}</Typography>
      <Typography>{createdAt}</Typography>
    </div>
  );
};