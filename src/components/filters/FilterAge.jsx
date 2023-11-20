import { Box, Typography, Slider } from "@mui/material";

function FilesterAge() {
    const valueYears = [8, 12];
    const marks = [
        {
          value: 6,
          label: '6',
        },
        {
          value: 18,
          label: '18',
        },
      ];
    return (
      <Box sx={{ mt: 1 }}>
        <Typography variant="body1" sx={{ mt: "1rem" }}>
          Возраст ребенка (6-18 лет):
        </Typography>
        <Box sx={{ m: "1rem 0.5rem 0rem 0.5rem" }}>
          <Slider
            value={valueYears}
            valueLabelDisplay="auto"
            max={18}
            min={6}
            // onChange={handleChangeYears}
            // getAriaValueText={valueText}
            marks={marks}
            // step={2}
            // size="small"
            color="success"
          />
        </Box>
      </Box>
    );
  }
  
  export {  FilesterAge };