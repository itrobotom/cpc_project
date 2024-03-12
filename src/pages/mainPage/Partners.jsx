import React from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';

// Мокап данных партнеров
const partnersData = [
  { id: 1, name: 'ТУСУР', logo: 'media/partners/tusur.png' },
  { id: 2, name: 'ТПУ', logo: 'media/partners/tpu.png' },
  { id: 3, name: 'ТГУ', logo: 'media/partners/tsu.png' },
//   { id: 4, name: 'Предприятие2', logo: 'url4' },
  // ... добавьте больше данных о партнерах по мере необходимости
];

const Partners = () => {
  return (
    <Box py={4} bgcolor="#fff" style={{ minHeight: '50vh'}}>
        <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "60px", marginBottom: "0px" }}>
            Наши партнеры
        </Typography>
        <Grid container spacing={2} style={{ backgroundColor: '#fff', padding: '20px', marginTop: '30px', paddingTop: '0px' }} alignItems="center" justifyContent="center">
            {partnersData.map((partner) => (
            <Grid key={partner.id} item xs={6} md={4} lg={3}>
                <Box textAlign="center">
                <Avatar src={partner.logo} alt={partner.name} sx={{ width: 200, height: 200, margin: '0 auto' }} />
                {/* <Typography variant="h6" mt={1}>
                    {partner.name}
                </Typography> */}
                </Box>
            </Grid>
            ))}
        </Grid>
    </Box>
  );
};

export default Partners;