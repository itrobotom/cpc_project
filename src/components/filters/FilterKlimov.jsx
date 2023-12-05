import { Chip, Box, Autocomplete, TextField, Checkbox, CircularProgress, } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/system";

//СДЕЛАТЬ В FILTERTYPEPROGRAM ПРОСТО ОТ ФЛАГА FilterFlagKlimov МЕНИЯЕМЫ OPTIONS И ВСЕ, НЕ НАДО ГОРОДИТЬ ДВА КОМПОНЕНТА ПОЧТИ ОДИНАКОВЫХ
//и название тоже сменяться должно с "Направления" на "Направления по Климову" или не делать


const ICON = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CHECKED_ICON = <CheckBoxIcon fontSize="small" />;
const LIMIT_TAGS = 5;
const FIRST_PAGE = 1;
const options = ["Человек-природа",
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
  
  return (
      <GreenAutocomplete
        multiple
        limitTags={LIMIT_TAGS}
        options={options}
        color="success"
        // то что будет выбрано изначально
      //   value={options}
        getOptionLabel={(option) => option}
      //   onChange={handleSelectGenres}
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