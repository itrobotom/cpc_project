import { TextField, Input } from "@mui/material";
import { inputName } from "../../store/reducers/FilterPanelSlice"
import { useDispatch, useSelector } from "react-redux"; 

function SearchNameProgram() {
  const dispatch = useDispatch();

  const handleChangeName = (event) => {
    console.log(event.target.value);
    dispatch(inputName(event.target.value));
  }
  return (

    <Input
            sx={{width: '250px', mb: 3 }}
            placeholder="Поиск по названию"  
            onChange={handleChangeName}
          />
  );
}
  
  export { SearchNameProgram };