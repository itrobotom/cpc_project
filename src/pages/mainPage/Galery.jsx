import { React } from 'react';
import { Paper, Grid } from "@mui/material";
import Slider from 'react-slick';

const Galery = () => {
    const images = [
        'media/galery/1.jpg',
        'media/galery/2.jpg',
        'media/galery/3.jpg',
        'media/galery/4.jpg',
        'media/galery/5.jpg',
        'media/galery/6.jpg',
        'media/galery/7.jpg',
        'media/galery/8.jpg',
        'media/galery/9.jpg',
        'media/galery/10.jpg',
        'media/galery/11.jpg',
        'media/galery/12.jpg',
        'media/galery/14.jpg',
        'media/galery/15.jpg',
        'media/galery/16.jpg',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    return(
        <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '40vh' }} alignItems="center" justifyContent="center">
            <Grid item xs={11} md={9}>
            {/* <Typography variant="h2" align="center" gutterBottom>
                Наши деятельность
            </Typography> */}
            </Grid>
            <Grid item xs={11} md={9} style={{ textAlign: 'center', marginBottom: "70px" }}>
            <Paper style={{ padding: '20px' }}>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', objectFit: 'cover', maxHeight: '500px' }} />
                        </div>
                    ))}
                </Slider>
            </Paper>
            </Grid>
        </Grid>
    )
}

export default Galery;