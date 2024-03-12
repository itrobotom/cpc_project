import { React } from 'react';
import { Typography, Grid } from "@mui/material";

const News = ({bgColor}) => {
    return(
        <Grid container spacing={2} style={{ backgroundColor: bgColor, padding: '20px', minHeight: '60vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
            <Grid item xs={8} alignSelf="center">
            <Typography variant="h4" align="center" gutterBottom>
                Новости!
            </Typography>
            <Typography fontSize={"28px"} align="center">
                Успехи наших учеников — важное событие для нас. Выдающиеся достижения публикуются в разделе <a href="http://localhost:3000/news">История успеха</a>. Посмотреть как проходят занятия у нас в центре, узнать результаты мероприямтий можно в социальных сетях объединений, а также в <a href="https://vk.com/cpc.tomsk" target="_blank">официальной группе Вконтакте</a>
            </Typography>
            </Grid>
        </Grid>
    )
}

export default News;