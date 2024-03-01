import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#33ab9f",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    minHeight: "95%",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  passwordBox: {
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
  fieldBox: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    gap: "20px",
    marginTop: "20px",
  },
  fieldContainer: {
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
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
  },
  validationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyBtn: {
    backgroundColor: "#33ab9f",
    color: "white",
    marginTop: "15px",
  },
}));

const PasswordGenerator= () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [validationStatus, setValidationStatus] = useState({
    passwordLength: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    specialCharacters: false,
  });
  const [sliderValue, setSliderValue] = useState(0);

  const handlePasswordChange = (event) => {
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

    const isValidPassword =
      isLengthValid &&
      validationStatus.uppercase &&
      validationStatus.lowercase &&
      validationStatus.numbers &&
      validationStatus.specialCharacters;

    let sliderIncrement = 0;
    if (isLengthValid) {
      sliderIncrement += 20;
    }
   else if (isUpperCaseValid) {
      sliderIncrement += 20;
    }

   else if (isLowerCaseValid) {
      sliderIncrement += 20;
    }

  else  if (isNumberValid) {
      sliderIncrement += 20;
    }

else  if (isSpecialCharacterValid) {
      sliderIncrement += 20;
    }

   else if (password !== "") {
      setPasswordStrength(isValidPassword ? "Strong" : "Weak");
    }
    setSliderValue(sliderIncrement);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.boxContainer}>
        <Stack className={classes.passwordBox}>
          <EnhancedEncryptionIcon sx={{ fontSize: "80px" }} className={classes.image} />
          <Box
            sx={{
              border: "2px solid",
              height: "30px",
              width: "150px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <CancelIcon color={validationStatus.passwordLength ? "info" : "action"} />
            <CancelIcon color={validationStatus.uppercase ? "info" : "action"} />
            <CancelIcon color={validationStatus.lowercase ? "info" : "action"} />
            <CancelIcon color={validationStatus.numbers ? "info" : "action"} />
            <CancelIcon color={validationStatus.specialCharacters ? "info" : "action"} />
          </Box>

          <Typography variant="h4">PASSWORD GENERATOR</Typography>
          <Typography variant="h6">
            Create a strong and secure password to keep your account safe online
          </Typography>

          <Stack className={classes.fieldBox}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={classes.fieldContainer}
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                helperText={passwordStrength}
                FormHelperTextProps={
                  passwordStrength === "Strong"
                    ? { sx: { color: "green" } }
                    : { sx: { color: "orange" } }
                }
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
              <Button
                className={classes.copyBtn}
                sx={{ bgcolor: "#33ab9f", color: "black", marginLeft: "10px" }}
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
              sx={{ color: "#33ab9f" }}
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
              <FormGroup className={classes.checkboxGroup}>
                <div className={classes.validationItem}>
                  <Typography>Password Length</Typography>
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success" checked={validationStatus.passwordLength} />}
                  />
                </div>
                <div className={classes.validationItem}>
                  <Typography>Uppercase</Typography>
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success" checked={validationStatus.uppercase} />}
                  />
                </div>
                <div className={classes.validationItem}>
                  <Typography>Lowercase</Typography>
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success" checked={validationStatus.lowercase} />}
                  />
                </div>
                <div className={classes.validationItem}>
                  <Typography>Numbers</Typography>
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success" checked={validationStatus.numbers} />}
                  />
                </div>
                <div className={classes.validationItem}>
                  <Typography>Special Characters</Typography>
                  <FormControlLabel
                    label=""
                    control={<Checkbox color="success" checked={validationStatus.specialCharacters} />}
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
