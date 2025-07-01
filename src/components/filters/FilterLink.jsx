import { Box, Typography, Button, Link } from "@mui/material";
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
        {/* <Typography 
        variant="h6"
        sx={{
            mb: 1,
        }}
        >
            Записаться на программу
        </Typography> */}
        <Link 
            href="https://reg.cpc.tomsk.ru/" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <Button 
                variant="contained" 
                endIcon={<SendIcon />}
                sx={{
                    animation: 'pulse 2s infinite',
                    "&:hover": {
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        transform: "scale(1.1)",
                        transition: "transform 0.3s ease-in-out"
                    },
                    "@keyframes pulse": {
                        "0%": {
                            transform: "scale(1)",
                        },
                        "50%": {
                            transform: "scale(1.1)",
                        },
                        "100%": {
                            transform: "scale(1)",
                        },
                    },
                }}
            >
                ЗАПИСАТЬСЯ
            </Button>
        </Link>
      </Box>
    );
  }
  
  export { FilterLink };