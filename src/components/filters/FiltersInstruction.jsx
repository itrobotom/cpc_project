import { Box, Typography, Button } from "@mui/material";
import { PopupInstruction } from "../popupInstuction/PopupInstruction";
import React, { useState } from 'react';

function FiltersInstuction() {
    const [isPopupVisible, setPopupVisible] = useState(false);
    

    const handleOpenPopup = () => {
      setPopupVisible(true);
    };
    const handleClosePopup = () => {
      setPopupVisible(false);
    };
    return (
      <>
        {isPopupVisible && <PopupInstruction isOpenPopupClick={ true } onClose={ handleClosePopup }/>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            onClick={handleOpenPopup}
            // color="success"
          >
            Инструкция
          </Button>
          <Typography
            sx={{
              ml: 0,
              pl: 0,
            }}
          >
            по работе с каталогом
          </Typography>
        </Box>
      </>
    );
  }
  
  export { FiltersInstuction };
  