import React from 'react';
import programsData from '../../data/programs-data.json';
import { Box, Typography } from "@mui/material";
import { CardProgram } from "../cardProgram/CardProgram"

const CatalogPrograms = () => {
    
    
    const catalogProgramList = programsData.map((program) => {
        return (
            <div key={program.id}>
                <CardProgram program={program} />
            </div>
        )
    });

    return (programsData.length > 0 ? (
        <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "flex-start",
            // расстояние между карточками
            // gap: "0rem", 
            // расстояние для пространства блока с фильтрами
            pl: "23.5rem",
            "@media(max-width: 50rem)": {
            p: "0rem",
            },
        }}
        >
            {catalogProgramList}
        </Box>
    ) : (
        <Box>
            <Typography
                sx={{
                    m: "0rem 0rem 1rem 26.5rem",
                    color: "grey",
                    fontSize: "1.15rem",
                    "@media(max-width: 50rem)": {
                        ml: "0rem",
                    },
                }}
            >
                <i>Программы отсутсвуют</i>
            </Typography>
        </Box>
        )
    )
}

export { CatalogPrograms }
