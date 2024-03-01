

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import CancelIcon from '@mui/icons-material/Cancel';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#33ab9f",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box_container: {
    minHeight: "95%",
    color: "black",
    display: "flex",
    justifyContent: "center",

    alignItems: "center",
  },
  password_box: {
    backgroundColor: "white",
    width: "75%",
    height: "85%",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  image: {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
    textAlign: "center",
    margin: "15px",
  },
  field_box: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    gap: "20px",
    marginTop: "20px",
  },
  field_container: {

    borderRadius: "50px",
  },
  slider: {
    width: "90%",
    marginTop: "20px",
  },
  checkboxes: {
    width: "90%",
    marginTop: "20px",
  },
  uppercase: {
    display: "flex",
    justifyContent: "space-between",
  },
  lowercase: {
    display: "flex",
    justifyContent: "space-between",
  },
  numbers: {
    display: "flex",
    justifyContent: "space-between",
  },
  special_character: {
    display: "flex",
    justifyContent: "space-between",
  },
  password_length:{
    display: "flex",
    justifyContent: "space-between",
  },
  copy_btn:{
     backgroundColor:"#33ab9f",
     color: "white",
  }
}));

const PasswordGenerator = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [validationStatus, setValidationStatus] = useState({
    passwordLength:false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    specialCharacters: false,
  });
  const [sliderValue, setSliderValue] = useState(0);

  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const isLengthValid = newPassword.length > 8;
    const isUpperCaseValid = /[A-Z]/.test(newPassword);
    const isLowerCaseValid = /[a-z]/.test(newPassword);
    const isNumberValid = /\d/.test(newPassword);
    const isSpecialCharacterValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    setValidationStatus({
      passwordLength: isLengthValid,
      uppercase: isUpperCaseValid,
      lowercase: isLowerCaseValid,
      numbers: isNumberValid,
      specialCharacters: isSpecialCharacterValid,
    });


    const isValidPassword = isLengthValid &&
     validationStatus.uppercase&&validationStatus.lowercase
     &&validationStatus.numbers&&validationStatus.specialCharacters

     let sliderIncrement = 0;
     if (isLengthValid) {
      sliderIncrement += 20;
    }
     if (isUpperCaseValid) {
       sliderIncrement += 20;
     }

     if (isLowerCaseValid) {
       sliderIncrement += 20;
     }

     if (isNumberValid) {
       sliderIncrement += 20;
     }

     if (isSpecialCharacterValid) {
       sliderIncrement += 20;
     }


   if(password!==""){
    setPasswordStrength(isValidPassword ? "Strong" : "Weak");
   }
    setSliderValue(sliderIncrement);
  };

  return (
    <Container className={classes.container}>


      <Box className={classes.box_container}>
        <Stack className={classes.password_box}>

          <EnhancedEncryptionIcon  sx={{fontSize:"80px"}} className={classes.image}/>
          <Box  sx={{border:"2px solid",height:"30px", width:"150px",display:"flex",justifyContent:"space-evenly"}} >
          <CancelIcon  color={validationStatus.passwordLength?"info":"action"}/>
          <CancelIcon  color={validationStatus.uppercase?"info":"action"}/>
          <CancelIcon color={validationStatus.lowercase?"info":"action"}/>
          <CancelIcon  color={validationStatus.numbers?"info":"action"} />
          <CancelIcon  color={validationStatus.specialCharacters?"info":"action"}/>

          </Box>

          <Typography variant="h4">PASSWORD GENERATOR</Typography>
          <Typography variant="h6">
            Create a strong and secure password to keep your account safe online
          </Typography>

          <Stack className={classes.field_box}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField

                className={classes.field_container}
                placeholder="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
               helperText={passwordStrength}
               FormHelperTextProps={passwordStrength=== "Strong" ?{sx:{color:"green"}}:{sx:{color:"orange"}}}

                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <ReplayIcon onClick={() => setPassword("")} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button className={classes.copy_btn}
              sx={{bgcolor:"#33ab9f",color:"black",margin:"0 0 15px 20px"}}
              >

                <FileCopyIcon

                  onClick={() => {
                    navigator.clipboard.writeText(password);
                  }}
                />
                Copy
              </Button>
            </Box>
          </Stack>

          <div className={classes.slider}>
            <Typography variant="body1" color="textSecondary">
              Password Length: {password.length}
            </Typography>
            <Slider
            sx={{color:"#33ab9f"}}
              step={20}
              max={100}
              className={classes.slider}
              value={sliderValue}
              valueLabelDisplay="auto"
            />
          </div>

          <Stack className={classes.checkboxes}>
            <FormControl>
              <FormLabel>Validations</FormLabel>
              <FormGroup>
              <div className={classes.password_length}>
                  <Typography>Password Length</Typography>
                  <FormControlLabel
                    label=""

                    control={
                      <Checkbox color="success"  checked={validationStatus.passwordLength} />
                    }
                  />
                </div>
                <div className={classes.uppercase}>
                  {" "}
                  <Typography>Uppercase</Typography>{" "}
                  <FormControlLabel
                    label=""
                    control={<Checkbox  color="success"  checked={validationStatus.uppercase} />}
                  />
                </div>
                <div className={classes.lowercase}>
                  {" "}
                  <Typography>Lowercase</Typography>{" "}
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success"  checked={validationStatus.lowercase} />}
                  />
                </div>
                <div className={classes.numbers}>
                  <Typography>Numbers</Typography>
                  <FormControlLabel

                    label=""
                    control={<Checkbox color="success"  checked={validationStatus.numbers} />}
                  />
                </div>
                <div className={classes.special_character}>
                  <Typography>Special Characters</Typography>
                  <FormControlLabel
                    label=""

                    control={
                      <Checkbox color="success"  checked={validationStatus.specialCharacters} />
                    }
                  />
                </div>

              </FormGroup>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default PasswordGenerator;
