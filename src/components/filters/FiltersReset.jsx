import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { resetFilter } from "../../store/reducers/FilterPanelSlice"

//ПРИ СБРОСЕ ФИЛЬТРОВ ВОЗВРАЩАТЬ СТОР НА ПАРАМЕТРЫ ПО УМОЛЧАНИЮ каждой настройки фильтра
function FiltersReset() {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    dispatch(resetFilter()); 
  }
  
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
        onClick={handleResetFilter}
        variant="outlined" color="error"
      >
        Сброс фильтров
      </Button>
    </Box>
  );
}
  
export { FiltersReset };
  