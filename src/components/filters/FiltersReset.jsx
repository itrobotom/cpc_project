import { Box, Button } from "@mui/material";

function FiltersReset() {

  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: "20px",
        }}
      >
        <Button 
          onClick={() => {
              alert('clicked');
          }}
          variant="outlined" color="error"
        >
          Сброс фильтров
        </Button>
      </Box>
    );
  }
  
  export { FiltersReset };
  