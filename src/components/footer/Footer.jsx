import { Box, Grid, Typography, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

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

      <Grid container spacing={2} justifyContent="center" mt={1}>
        <Grid item>
          <IconButton aria-label="email">
            <a href="mailto:cpc@education70.ru" target="_blank">
              <EmailIcon  style={{ color: 'grey', verticalAlign: 'middle' }}/>
            </a>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="vk">
            <a href="https://vk.com/cpc.tomsk" target="_blank">
              <FontAwesomeIcon icon={faVk} style={{ color: "#808080", fontSize: "20px", verticalAlign: 'middle' }} />
            </a>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="youtube">
            <a href="https://youtu.be/y5L7gmQhcWI?si=Zw2ONelvaiOgqn0D" target="_blank">
              <YouTubeIcon style={{ color: 'grey', verticalAlign: 'middle' }}/>
            </a>
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" mt={1}>
        © Copyright 2024
      </Typography>
    </Box>
  );
}

export default Footer;