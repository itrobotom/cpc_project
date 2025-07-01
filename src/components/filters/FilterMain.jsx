import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { SearchNameProgram } from "./SearchNameProgram";
import { FiltersReset } from "./FiltersReset";
import { FilterAge } from "./FilterAge";
import { FilterFlagKlimov } from "./FilterFlagKlimov";
import { FilterTypeProgramm } from "./FilterTypeProgram";
import { FilterKlimov } from "./FilterKlimov";
import { FilterTypePay } from "./FilterTypePay";
import { FiltersInstuction } from "./FiltersInstruction";
import { FilterLink } from "./FilterLink";
import { useDispatch, useSelector } from "react-redux"; 
import { resetFilter } from "../../store/reducers/FilterPanelSlice"

import React, { useEffect, useState } from 'react';

function FiltersMain() {
  const dispatch = useDispatch();
  const isHdMonitor = useMediaQuery("(min-height:700px)");
  const isPassedTestKlimov = useSelector((state) => state.valueFilters.isPassedTestKlimov);

  // Состояние для отслеживания скролла
  const [marginTop, setMarginTop] = useState("7rem");
    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setMarginTop("1rem"); // Убираем отступ при скролле
      } else {
        setMarginTop("7rem"); // Возвращаем отступ, если в самом верху
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        width: "20rem",
        top: marginTop, // Вместо `mt`, так как `fixed` не реагирует на `margin`
        "@media(max-width: 50rem)": {
          position: "static",
          top: marginTop, // Только если `static`, то `margin` работает
        },
        pl: "1rem",
        mb: "2rem",
        ml: "1rem",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: "0.5rem 1rem 3rem 1rem",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Поиск по фильтрам
        </Typography>
        <SearchNameProgram />
        <FilterAge />
        <FilterFlagKlimov />
        {isPassedTestKlimov ? <FilterKlimov /> : <FilterTypeProgramm />}
        <FilterTypePay />
        {isHdMonitor && <FiltersReset />}
        <FiltersInstuction />
        <FilterLink />
      </Paper>
    </Box>
  );
}
  
export { FiltersMain };


//старый вариант позиции панели фильтров
// function FiltersMain() {
//   //устанавливаем по умолчанию при запуске прлижения фильтры по умолчанию, поэтому диспатчим resetFilter
//   const dispatch = useDispatch();
//   //dispatch(resetFilter()); 
//   const isHdMonitor = useMediaQuery('(min-height:700px)');
//   const isPassedTestKlimov = useSelector(state => state.valueFilters.isPassedTestKlimov);
//   console.log("Из главного фильтра берем флаг климова", isPassedTestKlimov);
//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         width: "20rem",
//         "@media(max-width: 50rem)": {
//           position: "static",
//         },
//         pl: "1rem",
//         mb: "2rem",
//         ml: "1rem"
//       }}
//     >
//       <Paper
//         elevation={1}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           width: "100%",
//           p: "0.5rem 1rem 3rem 1rem",
//         }}
//       >
//         <Typography variant="h6" sx={{mb: 2}}>Поиск по фильтрам</Typography>
//         <SearchNameProgram />
//         <FilterAge />
//         <FilterFlagKlimov />
//         {/* отображаем фильтр либо по климову, либо по типу программ */}
//         {isPassedTestKlimov ? <FilterKlimov /> : <FilterTypeProgramm />}
        
//         <FilterTypePay />
//         {isHdMonitor && <FiltersReset />}
//         <FiltersInstuction />
//         <FilterLink />
//       </Paper>
//     </Box>
//   );
// }