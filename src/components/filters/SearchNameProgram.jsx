import { TextField } from "@mui/material";

function SearchNameProgram() {
  
    return (
      <TextField
        // onChange={handleChangeName}
        // value={name}
        color="success"
        label="Название программы"
        variant="outlined"
        sx={{
          m: "1rem 0rem 1rem 0rem",
          width: "100%",
        }}
      />
    );
  }
  
  export { SearchNameProgram };