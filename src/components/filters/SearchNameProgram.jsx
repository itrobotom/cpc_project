import { TextField, Input } from "@mui/material";
import { setInputName } from "../../store/reducers/FilterPanelSlice"
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";

function SearchNameProgram() {
  const dispatch = useDispatch();
  const inputName = useSelector(state => state.valueFilters.nameProgram);
  
  //console.log("Введенное имя для поиска", inputName);
  const handleChangeName = (event) => {
    console.log(event.target.value);
    dispatch(setInputName(event.target.value));
  }
  return (
    <Input
            sx={{width: '250px', mb: 0 }}
            placeholder="Поиск по названию"  
            onChange={handleChangeName}
            value={inputName}
    />
  );
}
  
  export { SearchNameProgram };