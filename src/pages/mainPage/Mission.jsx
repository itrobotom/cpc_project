import { React } from 'react';
import { Typography, Grid, useMediaQuery } from "@mui/material";

const Mission = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '70vh', paddingTop: '0px', width: isMobile ? '100%' : 'auto' }} alignItems="center" justifyContent="center">
            <Grid item xs={isMobile ? 12 : 8 } md={8} alignSelf="center">
                <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom>
                    Миссия центра
                </Typography>
                <Typography fontSize={isMobile ? "21px" : "28px"} align="center">
                    «В жизни каждого человека, возникает время, когда нужно сделать выбор. Выбор профессии зачастую сопровождается различного рода трудностями. Ведущая идея создания Центра заключается в создании специальных условий для допрофессионального самоопределения старшеклассников. В нашем центре уже с раннего возраста доступны различные программы и траектории развития, поэтому в старшем классе ребенку будет гораздо проще сделать правильный выбор»
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Mission; 