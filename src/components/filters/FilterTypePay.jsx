import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { selectTypePay } from "../../store/reducers/FilterPanelSlice"
import { useDispatch, useSelector } from "react-redux"; 

function FilterTypePay() {
  const typePay = useSelector(state => state.valueFilters.fundingType);
  
  console.log("тип платы: ", typePay);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(typePay);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('что мы получаем из select: ', event.target.value);
    dispatch(selectTypePay(event.target.value));
  };

  useEffect(() => { //при сбросе фильтра увидим, что стор поменялся на дефолт и обновим стейт чтобы на сайте тоже был актуальный тип сортировки по оплате
    setSelectedOption(typePay);
  }, [typePay])

  return (
    <FormControl sx={{ marginTop: 4 }} >
      <InputLabel htmlFor="filterTypePay" variant="outlined" color='success'>
        Финансирование:
      </InputLabel>
      <Select value={selectedOption} onChange={handleChange} label="_______________" color='success'>
        <MenuItem value={"allPayType"}>Бюджетные и платные</MenuItem>
        <MenuItem value={"noPayType"}>Бюджетные</MenuItem>
        <MenuItem value={"payType"}>Платные</MenuItem>
      </Select>
    </FormControl>
  );
}

//просто флаг чтобы отображать только бюджетные программы
// function FilterFlagTypePay() {
//     const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//     return(
//         <Box sx={{ mt: 3 }}>
//             <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="Показать только бюджетные программы" />
//         </Box>
        
//     )
// }

export { FilterTypePay }