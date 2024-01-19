import React from 'react';
import { Box } from "@mui/material";
import { DetailsProgram } from '../../components/detailsProgram/DetailsProgram';
// import { useParams } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import Header from "../../components/header/Header.jsx"

export function DetailsProgramPage(props) {
  // const { match } = props;
  // const { id } = match.params;
  // console.log("Вот id открытой программы", id); 
  //const program = useLoaderData(); //получаем данные в json про фильм
  //const { id } = useParams();
  //console.log("Вот id открытой программы", program.id); 
  return(
    <div>
      <Header/>
      <Box
        sx={{
          pt: "110px"
        }}
      > 
        <DetailsProgram />
      </Box>
    </div>
  )
}