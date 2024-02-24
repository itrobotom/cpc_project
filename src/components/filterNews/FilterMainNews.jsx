import { Box, Paper, Typography } from "@mui/material";
import { SearchNameNews } from "./SearchNameNews";
import { FiltersReset } from "./FiltersReset";
import { FilterYear } from "./FilterYear";
import { FilterTypeNews } from "./FilterTypeNews";
import { useDispatch, useSelector } from "react-redux"; 
// import { resetFilter } from "../../store/reducers/FilterPanelSlice"
// import NewsPagination from "../../components/filterNews/newsPagination/NewsPagination"
import React, { useEffect, useState } from 'react';

function FilterMainNews({ setPage }) {
  //устанавливаем по умолчанию при запуске прлижения фильтры по умолчанию, поэтому диспатчим resetFilter
  const dispatch = useDispatch();
  
  return (
    <Box
      sx={{
        position: "fixed",
        width: "20rem",
        pl: "1rem",
        mb: "2rem",
        ml: "11rem", //отступ от левого края
        "@media(max-width: 50rem)": {
          position: "static",
          ml: "4rem", //отступ от левого края
        },
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
        <SearchNameNews />
        <FilterYear />
        <FilterTypeNews />
        <FiltersReset />
        {/* <NewsPagination setPage={setPage} /> */}
      </Paper>
    </Box>
  );
}
  
export { FilterMainNews };