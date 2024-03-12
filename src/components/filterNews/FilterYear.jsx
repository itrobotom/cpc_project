import { Box, Typography, Slider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setYear } from "../../store/reducers/FilterNewsPanelSlice"

function FilterYear() {
  const [maxYear, setMaxYear] = useState(2024);
  const [minYear, setMinYear] = useState(2000); 
  const dispath = useDispatch();

  //подписались на изменения в сторе через useSelector
  const yearInterval = useSelector(state => state.valueFiltersNews.yearRange); 
  console.log("значение стора с полем года публикации", yearInterval);
  const handleChangeYears = (event) => {
    setMaxYear(event.target.value[1]);
    setMinYear(event.target.value[0]);
    //записать новые данные в стор по интервалу года
    dispath(setYear(event.target.value));
  }
  const valueYears = [minYear, maxYear];
  const marks = [
    {
      value: minYear,
      label: minYear,
    },
    {
      value: maxYear,
      label: maxYear,
    },
  ];
  useEffect(() => {
    setMaxYear(yearInterval.max);
    setMinYear(yearInterval.min);
    //console.log('из юсэффекта', yearInterval);
  }, [yearInterval])
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" sx={{ mt: "1rem" }}>
        Хронология (2000-2024 лет):
      </Typography>
      <Box sx={{ m: "1rem 0.5rem 0rem 0.5rem" }}>
        <Slider
          value={valueYears}
          valueLabelDisplay="auto"
          max={2024}
          min={2000}
          onChange={handleChangeYears}
          // getAriaValueText={valueText}
          marks={marks}
          // step={2}
          // size="small"
          //color="success"
        />
      </Box>
    </Box>
  );
}
  
export { FilterYear };