import { Button, TextField, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles=makeStyles({
  container: {
    display:"flex",
justifyContent:"center",
alignItems: "center",
margin:"150px auto",
  }
  ,
main_container:{

display:"flex",
justifyContent:"center",
alignItems:"center",
flexDirection:"column",
gap:40,
width:"30%",
height:"300px",
border:"1px solid black",
borderRadius:"10px",

}
})
const CountryForm: React.FC = () => {
  const classes= useStyles();
  const [countryName, setCountryName] = useState<string>("");
    const navigate=useNavigate()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };
  const handleSubmit=()=>{


        navigate("/country_info",{state:countryName})


  }

  return (
    <>
   <div className={classes.container}>
   <div  className={classes.main_container}>
   <div className="field_container">
        <TextField
        fullWidth
          placeholder="Enter Country Name"
          value={countryName}
          onChange={handleInputChange}
        />
</div>
<div className="btn_container">
          <Button
              fullWidth
              variant="contained"
              color="primary"
          onClick={handleSubmit}
          disabled={countryName.trim() === ""}>Submit</Button>

      </div>
   </div>
   </div>
    </>
  );
};

export default CountryForm;
