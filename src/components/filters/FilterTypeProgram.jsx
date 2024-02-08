import { Chip, Box, Autocomplete, TextField, Checkbox, CircularProgress, } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import { setTypeProgram, cleanTypeProgram, cleanTypeKlimovProgram } from "../../store/reducers/FilterPanelSlice"

const ICON = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CHECKED_ICON = <CheckBoxIcon fontSize="small" />;
const LIMIT_TAGS = 3;
const FIRST_PAGE = 1;
const SELECT_ALL_TYPE_PROGRAMM = 9; 
const selectTypeProgramDefault = ["технические направления и инженерия", 
                                  "гуманитарные и социальные",
                                  "естественно-научные", 
                                  "искусство и дизайн", 
                                  "экономика и бизнес", 
                                  "патриотические", 
                                  "иностранные языки", 
                                  "экология и окружающая среда",
                                  "программирование"];

const GreenAutocomplete = styled(Autocomplete)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
        // borderColor: 'green', // измените цвет фокуса на зеленый
        },
    },
});                
function FilterTypeProgramm() {
  //СДЕЛАТЬ ТАК, ЧТО ЕЛСИ НЕ ВЫБРАНО НИ ОДНОГО ВИДА, ТО ИЩЕТСЯ ПО ВСЕМ ВИДАМ, А ЕЛСИ ХОТЯ БЫ ОДИН ВЫБРАН, ТО УЖЕ ПО ЭТОМУ ПЕРЕЧНЮ, МОЖНО И ВТОРОЙ ДОБАВИТЬ
  //если стейт типов (массив) пустой, то делаем ресет фильтров или записываем все жанры в наш стор для поиска
  //иначе сначала чистим стор полностью, а затем добавляем выбранные жанры 
  const dispatch = useDispatch();

  const selectType = useSelector(state => state.valueFilters.type); 
  console.log("Выбрали новые типы: ", selectType);

  const [selectTypeProgram, setSelectTypeProgram] = useState([]);

  useEffect(() => { //как только в сторе будут все программы, обнуляем стейт кликнутых программ в выпадающем меню, чтобы отключить фильтр и сбросить теги
    if (selectType.length === SELECT_ALL_TYPE_PROGRAMM) {
      setSelectTypeProgram([]); // Сбросить выбранные теги, если selectType.length === 9
    }
  }, [selectType]);

  useEffect(() => { //вызываем перерендер как только сменится стейт с типами программ 
    console.log("Выбрана в типе программа: ", selectTypeProgram);
  }, [selectTypeProgram]);
  
  useEffect(() => {
    if(selectTypeProgram.length !== 0) { //если выбран хоть один пункт, сразу поиск ограничивается по выбранным пунктам
      dispatch(cleanTypeProgram());
      dispatch(setTypeProgram(selectTypeProgram));
    } else {
      dispatch(setTypeProgram(selectTypeProgramDefault)); //ставим в стор программы по дефолту в количестве 9 штук
    }
  }, [dispatch, selectTypeProgram]);

  const handleTypeProgram = (event, value) => {
    setSelectTypeProgram(value); 
  }  

  return (
    <GreenAutocomplete
      multiple
      limitTags={LIMIT_TAGS}
      options={selectTypeProgramDefault}
      // color="success"
      value={selectTypeProgram} // то что выбирается согласно стейту
      getOptionLabel={(option) => option}
      onChange={handleTypeProgram}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={ICON}
            checkedIcon={CHECKED_ICON}
            style={{ marginRight: 8 }}
            checked={selected}
            // color="success"
          />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField {...params} 
      // color="success" 
      label="Направления" 
      />}
      renderTags={(value, getTagProps) => {
        const numTags = value.length;
        const limitTags = LIMIT_TAGS;
        return (
          <>
            {value.slice(0, limitTags).map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={index}
                label={option}
              />
            ))}

            {numTags > limitTags && ` +${numTags - limitTags}`}
          </>
        );
      }}
      disableCloseOnSelect
      ListboxProps={{ sx: { maxHeight: "20rem" } }}
      noOptionsText={"Нет подходящих направлений"}
      sx={{ width: "100%", mt: "1rem" }}
    />
  );
    
}

export { FilterTypeProgramm }