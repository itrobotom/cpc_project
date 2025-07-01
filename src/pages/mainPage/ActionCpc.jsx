import { React } from 'react';
import { Typography, Grid, useMediaQuery } from "@mui/material";

const ActionCpc = ({bgColor}) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <Grid container spacing={2} style={{ backgroundColor: bgColor, padding: '20px', minHeight: '70vh', paddingTop: '0px' }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} alignSelf="center">
                {/* <Typography variant="h2" align="center" gutterBottom>
                    Миссия центра
                </Typography> */}
                <Typography fontSize={isMobile ? "21px" : "28px"} align="center">
                    Наш центр предлагает разнообразные направления, включая технические и инженерные дисциплины, программирование и робототехнику, гуманитарные и социальные науки, естественно-научные направления, искусство и дизайн, экономику и бизнес, патриотические занятия, изучение иностранных языков, а также обучение в области экологии и охраны окружающей среды.
                </Typography>
            </Grid>
            <Grid item xs={12} md={4} alignSelf="center">
                {/* Замените 'y5L7gmQhcWI' на фактический идентификатор видео на YouTube */}
                <iframe width="100%" height="315" src="https://vk.com/video_ext.php?oid=-132584949&id=456239784&autoplay=1" title="VK video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Grid>
        </Grid>
    )
}

export default ActionCpc;