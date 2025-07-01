import { Box, Paper, Typography } from "@mui/material";
import { SearchNameNews } from "./SearchNameNews";
import { FiltersReset } from "./FiltersReset";
import { FilterYear } from "./FilterYear";
import { FilterTypeNews } from "./FilterTypeNews";
import { useSelector } from "react-redux"; 
// import { resetFilter } from "../../store/reducers/FilterPanelSlice"
// import NewsPagination from "../../components/filterNews/newsPagination/NewsPagination"
import React, { useEffect, useState } from 'react';

function FilterMainNews() {
  //устанавливаем по умолчанию при запуске прлижения фильтры по умолчанию, поэтому диспатчим resetFilter
  const { news } = useSelector((state) => state.news); //все новости объектом
  // console.log("Все новости объектом", news);
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
        top: marginTop, // Вместо `mt`, так как `fixed` не реагирует на `margin`
        "@media(max-width: 50rem)": {
          position: "static",
          top: marginTop, // Только если `static`, то `margin` работает
        },
        width: "20rem",
        pl: "1rem",
        mb: "2rem",
        ml: "11rem", //отступ от левого края
        "@media(max-width: 50rem)": {
          position: "static",
          ml: "1rem", //отступ от левого края
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
        <Typography sx={{mt: "1rem"}} >Всего событий: {news.items.length}</Typography>
      </Paper>
    </Box>
  );
}
  
export { FilterMainNews };