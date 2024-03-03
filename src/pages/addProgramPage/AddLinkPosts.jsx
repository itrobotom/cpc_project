import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import {TextField, IconButton, Button, Box, Typography} from "@mui/material";

const AddLinkPosts = ({ linkPosts, setLinkPost }) => {
    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        const updatedLinkPosts = [...linkPosts];
        updatedLinkPosts[index] = {
            ...updatedLinkPosts[index],
            [field]: value
        };
        setLinkPost(updatedLinkPosts);
    };

    const handleAddLinkPost = () => {
        setLinkPost([...linkPosts, { comment: '', link: ''}]);
    };

    const handleRemoveLinkPost = (index) => {
        const updatedLinkPosts = [...linkPosts];
        updatedLinkPosts.splice(index, 1);
        setLinkPost(updatedLinkPosts);
    };

    return (
        <div>
            <Typography
                variant="h6" gutterBottom
            >
                Добавить событие (как проходит занятие, достижение обучающихся и тд с ссылкой на событие из соц.сети, например):
            </Typography>
            {linkPosts.map((linkPost, index) => (
                <Box 
                    key={index}
                    sx={{textAlign: 'left'}}
                >
                    <TextField
                        label="Комментарий к событию"
                        value={linkPost.comment || ''}
                        onChange={(event) => handleInputChange(event, index, 'comment')}
                        style={{ width: '50%', margin: '10px' }} 
                    />
                    <TextField
                        label="Ссылка на событие"
                        value={linkPost.link || ''}
                        onChange={(event) => handleInputChange(event, index, 'link')}
                        style={{ width: '38%', margin: '10px' }} 
                    />
                    {/* <Button onClick={() => handleRemoveInstructor(index)}>Удалить</Button> */}
                    <IconButton onClick={() => handleRemoveLinkPost(index)} style={{ marginTop: "17px" }} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button onClick={handleAddLinkPost}>Добавить событие</Button>
        </div>
    );
};

export default AddLinkPosts;