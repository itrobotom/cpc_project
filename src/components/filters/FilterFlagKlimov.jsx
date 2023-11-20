import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

function FilterFlagKlimov() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return(
        <Box sx={{ mt: 2 }}>
            <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="Прошел тест по профоориентации (с 11 лет)" />
        </Box>
        
    )
}

export { FilterFlagKlimov }