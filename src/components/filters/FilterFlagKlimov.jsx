import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux"; 
import { setTestKlimov } from "../../store/reducers/FilterPanelSlice"



function FilterFlagKlimov() {
    const isCheckBoxAction = useSelector(state => state.valueFilters.isPassedTestKlimov); //забрали из дефолта флаг климова
    const [isCheckBox, setIsCheckBox] = useState(isCheckBoxAction);
    const dispatch = useDispatch();
    const handleFilterKlimov = () => { 
        if(isCheckBox) {
            setIsCheckBox(false);
            dispatch(setTestKlimov(false));
        } else {
            setIsCheckBox(true);
            dispatch(setTestKlimov(true));
        }
    }

    return(
        <Box sx={{ mt: 1 }}>
            <FormControlLabel 
                control={<Checkbox defaultChecked color="success"/>} 
                label="Прошел тест по профоориентации (с 11 лет)" 
                checked={isCheckBoxAction ? true : false}
                onChange={handleFilterKlimov}
            />
        </Box> 
    )
}

export { FilterFlagKlimov }