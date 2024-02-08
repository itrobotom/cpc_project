import { Box, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function FilterLink() {

  
    return (
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
        }}
      >
        <Typography 
        variant="h6"
        sx={{
            mb: 1,
        }}
        >
            Записаться на программу
        </Typography>
        <Button 
            onClick={() => {
                alert('clicked');
            }}
            variant="contained" 
            // color="success" 
            endIcon={<SendIcon />}
            sx={{
              // color: "#fff",
              // backgroundColor: "#4CAF50", // Цвет кнопки
              "&:hover": {
                // backgroundColor: "#45a049", // Цвет кнопки при наведении
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // Тень кнопки при наведении
                transform: "scale(1.1)", // Увеличение размера при наведении
                transition: "transform 0.3s ease-in-out" // Анимация увеличения
              },
            }}
        >
            ЗАПИСАТЬСЯ
        </Button>
      </Box>
    );
  }
  
  export { FilterLink };