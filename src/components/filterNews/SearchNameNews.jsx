import { TextField, Input } from "@mui/material";
import { setInputName } from "../../store/reducers/FilterNewsPanelSlice"
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";

function SearchNameNews() {
  const dispatch = useDispatch();
  const inputName = useSelector(state => state.valueFiltersNews.nameNews);
  
  //console.log("Введенное имя для поиска", inputName);
  const handleChangeName = (event) => {
    console.log(event.target.value);
    dispatch(setInputName(event.target.value));
  }
  return (
    <Input
            sx={{width: '250px', mb: 1 }}
            placeholder="Поиск по названию"  
            onChange={handleChangeName}
            value={inputName}
    />
  );
}
  
  export { SearchNameNews };