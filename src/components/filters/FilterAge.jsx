import { Box, Typography, Slider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAge } from "../../store/reducers/FilterPanelSlice"

function FilterAge() {
  const [maxAge, setMaxAge] = useState(18);
  const [minAge, setMinAge] = useState(6); 
  const dispath = useDispatch();

  //подписались на изменения в сторе через useSelector
  const ageInterval = useSelector(state => state.valueFilters.ageRange); //по названию редьюсера valueFilters получаем доступ к стору, который в combineReducer используется для объединения всех редьюсеров в store.js
  console.log("значение стора с полем возраста", ageInterval);
  const handleChangeYears = (event) => {
    //console.log('Максимум возраст: ', event.target.value[1]); 
    //console.log('Минимум возраст: ', event.target.value[0]); 
    setMaxAge(event.target.value[1]);
    setMinAge(event.target.value[0]);
    //записать новые данные в стор по интервалу возраста из стейтов minAge и maxAge, а потом вытащить данные в компоненте CatalogProgram, где отрисовка канточек
    dispath(setAge(event.target.value));
  }
  const valueYears = [minAge, maxAge];
  const marks = [
    {
      value: minAge,
      label: minAge,
    },
    {
      value: maxAge,
      label: maxAge,
    },
  ];
  useEffect(() => {
    setMaxAge(ageInterval.max);
    setMinAge(ageInterval.min);
    //console.log('из юсэффекта', ageInterval);
  }, [ageInterval])
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" sx={{ mt: "1rem" }}>
        Возраст ребенка (6-18 лет):
      </Typography>
      <Box sx={{ m: "1rem 0.5rem 0rem 0.5rem" }}>
        <Slider
          value={valueYears}
          valueLabelDisplay="auto"
          max={18}
          min={6}
          onChange={handleChangeYears}
          // getAriaValueText={valueText}
          marks={marks}
          // step={2}
          // size="small"
          color="success"
        />
      </Box>
    </Box>
  );
}
  
export { FilterAge };