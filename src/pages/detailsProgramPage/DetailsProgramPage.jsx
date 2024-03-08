import React, {useEffect} from 'react';
import { Box } from "@mui/material";
import { DetailsProgram } from '../../components/detailsProgram/DetailsProgram';
// import { useParams } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import Header from "../../components/header/Header.jsx"
import Footer from "../../components/footer/Footer.jsx"

export function DetailsProgramPage(props) {
  // const { match } = props;
  // const { id } = match.params;
  // console.log("Вот id открытой программы", id); 
  //const program = useLoaderData(); //получаем данные в json про фильм
  //const { id } = useParams();
  //console.log("Вот id открытой программы", program.id); 
  useEffect(() => { //автопрокрутка вверх
    window.scrollTo(0, 0); // Прокрутка вверх при монтировании компонента
  }, []);

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
      <Footer/>
    </div>
  )
}