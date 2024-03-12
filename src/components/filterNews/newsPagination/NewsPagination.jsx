import { React, useState } from 'react';
import './NewsPagination.css'
import { Box, Pagination } from "@mui/material";

function NewsPagination( { setPageNum, pageCount } ) {
  const handleChange = (event, value) => {
    setPageNum(value);
    //console.log(value);
  };
  const DEFAULT_PAGE = 1; 
  
  return (
    <>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
        mb: 3,
      }}
    >
      <Pagination
        defaultPage={DEFAULT_PAGE}
        count={pageCount}
        color="primary"
        siblingCount={0}
        onChange={handleChange}
      />
    </Box>
    </>
  );
}

export default NewsPagination;
