import Header from "../../components/header/Header.jsx"
import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Stack } from "@mui/material"; 

import { FilterMainNews } from "../../components/filterNews/FilterMainNews.jsx"
import Footer from '../../components/footer/Footer.jsx';

import { CatalogNews } from "../../components/catalogNews/CatalogNews.jsx";

export function NewsPage() {
    
    const [page, setPage] = useState(1); //установка страницы в пагинации (для получения нужных 5 новостей)
    //console.log('Страница новостей', page); //меняется она в блоке с фильтрами и отображается здесь
    
    return (
        <div>
        <Header/>
        <Box
            sx={{
            width: "100%",
            pt: "110px",
            "@media screen and (max-width: 768px)": {
                pt: "230px"
            }
            }}
        > 
            <FilterMainNews/>
            <CatalogNews setPage={setPage} page={page}/>
            
        </Box>
        <Footer/>
        </div> 
    );
}


