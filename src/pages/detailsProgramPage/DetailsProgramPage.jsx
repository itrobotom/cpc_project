import React from 'react';
import { DetailsProgram } from '../../components/detailsProgram/DetailsProgram';
// import { useParams } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";

export function DetailsProgramPage(props) {
  // const { match } = props;
  // const { id } = match.params;
  // console.log("Вот id открытой программы", id); 
  //const program = useLoaderData(); //получаем данные в json про фильм
  //const { id } = useParams();
  //console.log("Вот id открытой программы", program.id); 
  return(
    <DetailsProgram />
  )
}