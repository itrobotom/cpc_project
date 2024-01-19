import { React, useState } from 'react';
import './NewsPagination.css'
import { Box, Pagination } from "@mui/material";

function NewsPagination( { setPage } ) {
  const handleChange = (event, value) => {
    setPage(value);
    //console.log(page);
  };
  const COUNT_NEWS_ON_PAGE = 5;
  const [countNews, setCountNews] = useState(10); //получить с сервера количество новостей по умолчанию (пока 10)
  const [countPages, setCountPages] = useState(countNews/COUNT_NEWS_ON_PAGE); //количестов новостей делим на 5 (по 5 шт на странице за раз)
                        //при изменениее количества новостей (после работы фильтров) количество страниц тоже уменьшится и обновиться
  const [defaultPage, setDefaultPage] = useState(1);                      // и сбрасываем на первую страницу в случае смены количества новостей (из-за фильтров)
                        
  return (
    <>
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <Pagination
        defaultPage={defaultPage}
        count={countPages}
        color="success"
        siblingCount={0}
        onChange={handleChange}
      />
    </Box>
    </>
  );
}

export default NewsPagination;
