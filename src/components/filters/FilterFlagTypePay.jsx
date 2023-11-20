import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

function FilterFlagTypePay() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return(
        <Box sx={{ mt: 3 }}>
            <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="Показать только бюджетные программы" />
        </Box>
        
    )
}

export { FilterFlagTypePay }