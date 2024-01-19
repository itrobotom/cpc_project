import { Box, Grid, Typography, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <Box py={4} bgcolor="#f9f9f9" textAlign="center">
      <Typography variant="h5" gutterBottom>
        Контакты
      </Typography>
      <Typography variant="body1" gutterBottom>
        Наш адрес: г. Томск, ул. Смирнова, 28 ст.1
      </Typography>
      <Typography variant="body1" gutterBottom>
        Телефон: +7 (3822) 90-11-73
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: cpc@education70.ru
      </Typography>

      <Grid container spacing={2} justifyContent="center" mt={4}>
        <Grid item>
          <IconButton aria-label="email">
            <EmailIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="facebook">
            <FacebookIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="youtube">
            <YouTubeIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Typography variant="body2" mt={4}>
        © Copyright 2024
      </Typography>
    </Box>
  );
}

export default Footer;