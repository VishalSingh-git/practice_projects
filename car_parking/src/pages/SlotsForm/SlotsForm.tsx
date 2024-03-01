import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../component/GlobalContext";

const SlotsForm:React.FC = () => {

   const navigate=useNavigate()
  const [inputValue, setInputValue] = useState<number|string>();
const value=useContext(GlobalContext)
  const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!isNaN(Number(newValue))) {
      setInputValue(newValue);
      value?.handleNumberOfSlots(parseInt(newValue, 10));
    } else {
      alert("Please enter a valid number!");
    }
  };

  const handleButtonClick = () => {
    navigate("/allSlots")
  };
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{ height: "100vh" }}
    >
      <Grid
        container
        spacing={2}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          height: "300px",
          width: "400px",
          backgroundColor: "gray",
          borderRadius: "10px",
        }}
      >
        <Grid item>
          <TextField
            label="Enter number of slots"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleButtonClick}>
            {" "}
            Enter
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SlotsForm;
