import { Box, Typography, Slider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setYear } from "../../store/reducers/FilterNewsPanelSlice";
import moment from "moment";

function FilterYear() {
  const [yearRange, setYearRange] = useState([1996, moment().year()]); // Используйте state для хранения диапазона годов
  const dispatch = useDispatch();

  // Подписались на изменения в сторе через useSelector
  const yearInterval = useSelector(state => state.valueFiltersNews.yearRange); 
  console.log("Значение стора с полем года публикации", yearInterval);

  const handleChangeYears = (_, newValues) => {
    setYearRange(newValues);
    // Записать новые данные в стор по интервалу года
    dispatch(setYear(newValues));
  };


  useEffect(() => {
    const currentYear = moment().year(); //получаем текущий год из библиотеки
    setYearRange([1996, currentYear]); // Установите текущий год как максимальный год
  }, []);

  const marks = [
    {
      value: yearRange[0],
      label: yearRange[0],
    },
    {
      value: yearRange[1],
      label: yearRange[1],
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" sx={{ mt: "1rem" }}>
        Хронология ({yearRange[0]}-{yearRange[1]} лет):
      </Typography>
      <Box sx={{ m: "1rem 0.5rem 0rem 0.5rem" }}>
        <Slider
          value={yearRange} // Передаем значения из состояния
          valueLabelDisplay="auto"
          max={moment().year()} // Максимальный год будет текущим годом
          min={1996}
          onChange={handleChangeYears}
          step={1} // Шаг изменения
          marks={marks}
        />
      </Box>
    </Box>
  );
}
  
export { FilterYear };