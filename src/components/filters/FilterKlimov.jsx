import { Chip, Box, Autocomplete, TextField, Checkbox, CircularProgress, } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import { setTypeKlimovProgram, cleanTypeKlimovProgram } from "../../store/reducers/FilterPanelSlice"
//СДЕЛАТЬ В FILTERTYPEPROGRAM ПРОСТО ОТ ФЛАГА FilterFlagKlimov МЕНИЯЕМЫ OPTIONS И ВСЕ, НЕ НАДО ГОРОДИТЬ ДВА КОМПОНЕНТА ПОЧТИ ОДИНАКОВЫХ
//и название тоже сменяться должно с "Направления" на "Направления по Климову" или не делать


const ICON = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CHECKED_ICON = <CheckBoxIcon fontSize="small" />;
const LIMIT_TAGS = 5;
const FIRST_PAGE = 1;
const SELECT_ALL_TYPE_PROGRAMM = 5; 
const selectTypeKlimovProgramDefault = ["Человек-природа",
                                        "Человек-техника", 
                                        "Человек-человек", 
                                        "Человек-знаковая система", 
                                        "Человек-художественный образ"];

const GreenAutocomplete = styled(Autocomplete)({
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
      borderColor: 'green', // измените цвет фокуса на зеленый
      },
    },
});     


function FilterKlimov() {
  //СДЕЛАТЬ ТАК, ЧТО ЕЛСИ НЕ ВЫБРАНО НИ ОДНОГО ВИДА, ТО ИЩЕТСЯ ПО ВСЕМ ВИДАМ, А ЕЛСИ ХОТЯ БЫ ОДИН ВЫБРАН, ТО УЖЕ ПО ЭТОМУ ПЕРЕЧНЮ, МОЖНО И ВТОРОЙ ДОБАВИТЬ
  const dispatch = useDispatch();

  const selectTypeKlimov = useSelector(state => state.valueFilters.typeKlimov); 
  console.log("Выбрали новые типы по Климову: ", selectTypeKlimov);

  const [selectTypeKlimovProgram, setSelectTypeKlimovProgram] = useState([]);

  useEffect(() => { //как только в сторе будут все программы, обнуляем стейт кликнутых программ в выпадающем меню, чтобы отключить фильтр и сбросить теги
    if (selectTypeKlimov.length === SELECT_ALL_TYPE_PROGRAMM) {
      setSelectTypeKlimovProgram([]); // Сбросить выбранные теги, если selectType.length === 9
    }
  }, [selectTypeKlimov]);

  useEffect(() => { //вызываем перерендер как только сменится стейт с типами программ 
    console.log("Выбрана в типе программа: ", selectTypeKlimovProgram);
  }, [selectTypeKlimovProgram]);
  
  useEffect(() => {
    if(selectTypeKlimovProgram.length !== 0) { //если выбран хоть один пункт, сразу поиск ограничивается по выбранным пунктам
      dispatch(cleanTypeKlimovProgram());
      dispatch(setTypeKlimovProgram(selectTypeKlimovProgram));
    } else {
      dispatch(setTypeKlimovProgram(selectTypeKlimovProgramDefault)); //ставим в стор программы по дефолту в количестве 9 штук
    }
  }, [dispatch, selectTypeKlimovProgram]);

  const handleTypeProgram = (event, value) => {
    setSelectTypeKlimovProgram(value); 
  }  

  return (
      <GreenAutocomplete
        multiple
        limitTags={LIMIT_TAGS}
        options={selectTypeKlimovProgramDefault}
        color="success"
        value={selectTypeKlimovProgram} // то что выбирается согласно стейту
        getOptionLabel={(option) => option}
        onChange={handleTypeProgram}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={ICON}
              checkedIcon={CHECKED_ICON}
              style={{ marginRight: 8 }}
              checked={selected}
              color="success"
            />
            {option}
          </li>
        )}
        renderInput={(params) => <TextField {...params} color="success" label="Направления по Климову" />}
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

export { FilterKlimov }