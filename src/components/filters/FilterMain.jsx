import { Box, Paper, Typography } from "@mui/material";
import { SearchNameProgram } from "./SearchNameProgram";
import { FiltersReset } from "./FiltersReset";
import { FilesterAge } from "./FilterAge";
import { FilterFlagKlimov } from "./FilterFlagKlimov";
import { FilterTypeProgramm } from "./FilterTypeProgram";
import { FilterFlagTypePay } from "./FilterFlagTypePay";
import { FiltersInstuction } from "./FiltersInstruction";
import { FilterLink } from "./FilterLink";

function FiltersMain() {
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
          <Typography variant="h6">Поиск по фильтрам</Typography>
          <SearchNameProgram />
          <FilesterAge />
          <FilterFlagKlimov />
          <FilterTypeProgramm />
          <FilterFlagTypePay />
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