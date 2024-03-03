import { React, useCallback } from 'react';
import { TextField, Box, Typography, Checkbox, FormControlLabel }   from '@mui/material';

const ShortInput = ({
    titleProgram, setTitleProgram, 
    shortTitleProgram, setShortTitleProgram,  
    linkVideo, setLinkVideo,
    linkGroup, setLinkGroup,
    isBudgetProgramm, setIsBudgetProgramm,
    commentVideo, setCommentVideo, 
    commentProgram, setCommentProgram}) => {

    const handleProgramTitleChange = useCallback((text) => {
        setTitleProgram(text.target.value);
    }, []);

    const handleProgramShortTitleChange = useCallback((text) => {
        setShortTitleProgram(text.target.value);
    }, []);

    const handleLinkVideo = useCallback((text) => {
        setLinkVideo(text.target.value);
    }, []);

    const handleCommentVideo = useCallback((text) => {
        if(text.target.value.length < 150){
            setCommentVideo(text.target.value);
        } else {
            alert("Превышен лимит в 150 символов");
        }
        
    }, []);
    const handleCommentProgram = useCallback((text) => {
        if(text.target.value.length < 300){
            setCommentProgram(text.target.value);
        } else {
            alert("Превышен лимит в 200 символов");
        }
        
    }, []);

    const handleLinkGroup = useCallback((text) => {
        setLinkGroup(text.target.value);
    }, []);

    const handleCheckPay = useCallback(() => {
        setIsBudgetProgramm(!isBudgetProgramm);
    })

    return(
        <>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите полное название обрзовательной программы*:
                </Typography>
                <TextField
                    id="title-program"
                    label="Введите полное название программы"
                    value={titleProgram}
                    onChange={handleProgramTitleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите сокращенное название образовательной программы (можно повторить, если название вмещается в 3 слова)*:
                </Typography>
                <TextField
                    id="title-short-program"
                    label="Введите сокращенное название программы"
                    value={shortTitleProgram}
                    onChange={handleProgramShortTitleChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите ссылку на видео:
                </Typography>
                <TextField
                    id="link-video"
                    label="Введите название программы"
                    value={linkVideo}
                    onChange={handleLinkVideo}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите комментарий к видео не более 150 символов (пример выполнения задания с занятия, как проходят занятия, работа в группах над проектом и тд):
                </Typography>
                <TextField
                    id="link-video"
                    label="Введите комментарий к видео"
                    value={commentVideo}
                    onChange={handleCommentVideo}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите ссылку на группу в социальных сетях:
                </Typography>
                <TextField
                    id="link-group"
                    label="Введите ссылку на соц сети"
                    value={linkGroup}
                    onChange={handleLinkGroup}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Введите примечание к образовательной программе не более 200 символов (например: программа бюджетная, предполагается благотварительный взнос по желанию):
                </Typography>
                <TextField
                    id="link-video"
                    label="Введите примечение к образовательной программе"
                    value={commentProgram}
                    onChange={handleCommentProgram}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
            </Box>
            <FormControlLabel
                control={<Checkbox defaultChecked onClick={handleCheckPay} />}
                label={<Typography variant="h6">Бюджетная услуга*</Typography>}
            />
        </>
    )
}

export default ShortInput;