import { React } from 'react';
import { Typography, Grid } from "@mui/material";

const Mission = () => {
    return(
        <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '70vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
            <Grid item xs={8} alignSelf="center">
            <Typography variant="h3" align="center" gutterBottom>
                Миссия центра
            </Typography>
            <Typography fontSize={"28px"} align="center">
            «В жизни каждого человека, возникает время, когда нужно сделать выбор. Выбор профессии зачастую сопровождается различного рода трудностями. Ведущая идея создания Центра заключается в создании специальных условий для допрофессионального самоопределения старшеклассников. В нашем центре уже с раннего возраста доступны различные программы и траектории развития, поэтому в старшем классе ребенку будет гораздо проще сделать правильный выбор»
            </Typography>
            </Grid>
        </Grid>
    )
}

export default Mission; 