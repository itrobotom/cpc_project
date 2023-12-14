import { Box, Paper, Typography } from "@mui/material";
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
  //устанавливаем по умолчанию при запуске прлижения фильтры по умолчанию, поэтому диспатчим resetFilter
  const dispatch = useDispatch();
  //dispatch(resetFilter()); 
  const isPassedTestKlimov = useSelector(state => state.valueFilters.isPassedTestKlimov);
  console.log("Из главного фильтра берем флаг климова", isPassedTestKlimov);
  return (
    <Box
      sx={{
        position: "fixed",
        width: "20rem",
        "@media(max-width: 50rem)": {
          position: "static",
        },
        pl: "1rem",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: "1rem 1rem 3rem 1rem",
        }}
      >
        <Typography variant="h6" sx={{mb: 2}}>Поиск по фильтрам</Typography>
        <SearchNameProgram />
        <FilterAge />
        <FilterFlagKlimov />
        {/* отображаем фильтр либо по климову, либо по типу программ */}
        {isPassedTestKlimov ? <FilterKlimov /> : <FilterTypeProgramm />}
        
        <FilterTypePay />
        <FiltersReset />
        <FiltersInstuction />
        <FilterLink />
        {/* 
        
        <SortByFilter />
        <YearsFilter />
        <GenreFilter />
        <PaginationPanel /> */}
      </Paper>
    </Box>
  );
}
  
export { FiltersMain };