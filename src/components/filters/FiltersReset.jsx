import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { setInputName } from "../../store/reducers/FilterPanelSlice"
import { resetFilter } from "../../store/reducers/FilterPanelSlice"

//ПРИ СБРОСЕ ФИЛЬТРОВ ВОЗВРАЩАТЬ СТОР НА ПАРАМЕТРЫ ПО УМОЛЧАНИЮ каждой настройки фильтра
function FiltersReset() {
  const dispatch = useDispatch();
  
  const handleResetFilter = () => {
    dispatch(resetFilter()); 
    dispatch(setInputName("")); //обнулить поле ввода поиска программ 
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
        variant="outlined" color="primary"
      >
        Сброс фильтров
      </Button>
    </Box>
  );
}
  
export { FiltersReset };
  