import React from 'react';
import { Box } from "@mui/material";
import { CatalogPrograms } from '../../components/catalogPrograms/CatalogPrograms';
import { FiltersMain } from '../../components/filters/FilterMain';
import { PopupInstruction } from '../../components/popupInstuction/PopupInstruction';
import { CatalogFavoritePrograms } from '../../components/catalogFavoritePrograms/CatalogFavoritePrograms'

import Header from "../../components/header/Header.jsx"

export function CatalogProgramsPage() {
  

  return (
    <div>
      <Header/>
      <PopupInstruction />
      <Box
        sx={{
          width: "100%",
          pt: "110px",
          "@media screen and (max-width: 768px)": {
            pt: "230px"
          }
        }}
      > 
        <FiltersMain />
        <CatalogPrograms />
        <CatalogFavoritePrograms />
      </Box>
    </div>
  );
}


{/* <Box
sx={{
  width: "100%",
  pt: "110px",
  "@media screen and (max-width: 768px)": {
    pt: "230px"
  }
}}
>  */}