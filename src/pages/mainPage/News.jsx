import { React } from 'react';
import { Typography, Grid, useMediaQuery } from "@mui/material";

const News = ({bgColor}) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <Grid container spacing={2} style={{ backgroundColor: bgColor, padding: '20px', minHeight: '60vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
            <Grid item xs={isMobile ? 12 : 8 } alignSelf="center">
            <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom>
                Новости!
            </Typography>
            <Typography fontSize={isMobile ? "21px" : "28px"} align="center">
                Успехи наших учеников — важное событие для нас. Выдающиеся достижения публикуются в разделе <a href="https://info.cpc.tomsk.ru/news">История успеха</a>. Посмотреть как проходят занятия у нас в центре, узнать результаты мероприямтий можно в социальных сетях объединений, а также в <a href="https://vk.com/cpc.tomsk" target="_blank">официальной группе Вконтакте</a>
            </Typography>
            </Grid>
        </Grid>
    )
}

export default News;