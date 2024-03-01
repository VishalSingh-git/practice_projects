import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: "gray",
    height: "500px",
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    gap: "50px",
  },
  inputfield: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px auto",
    padding: "50px",
   flexWrap:"wrap"
  },
  radio: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px auto",
    padding: "10px",


  },
});

const InputTodo = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [radio, setRadio] = useState("");

  const classes = useStyles();

  const navigate = useNavigate();

  const handleClick = () => {
    if (heading === "" || description === "" || radio === "") {
      alert("Please fill all required fields");
      return;
    }

    const obj = {
      id: Math.floor(1000 + Math.random() * 9000),
      heading: heading,
      description: description,
      status: radio,
    };
    const data = localStorage.getItem("todos");


    const jsonData = data ? JSON.parse(data) : [];
    jsonData.push(obj);

    localStorage.setItem("todos", JSON.stringify(jsonData));
    navigate("/list-todo");
    console.log(jsonData);
  };


  const handleInput = (e) => {
    if (e.target.id === "heading") {
      setHeading(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };
  const handleChange = (e) => {
    setRadio(e.target.value);
  };

  return (
    <>
      <Typography
        style={{ textAlign: "center", color: "red" }}
        variant="h3"
        gutterBottom
      >
        TASK TODO
      </Typography>
      <Container className={classes.container}>
        <div className={classes.inputfield}>
          <TextField
            id="heading"
            label="Heading"
            variant="outlined"
            value={heading}
            onChange={handleInput}
            className={classes.heading}
            error={heading===""?true:false}
            helperText={heading===""?"Please enter":""}

          />
          <TextField
            id="desc"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleInput}
            error={description===""?true:false}
            helperText={description===""?"Please enter":""}
          />
        </div>
        <Typography
          style={{ textAlign: "center", color: "blue" }}
          variant="h5"
          gutterBottom
        >
          STATUS
        </Typography>
        <div className={classes.radio}>
          <RadioGroup
            row
            aria-label="options"
            name="options"
            value={radio}
            onChange={handleChange}

          >
            <FormControlLabel  error={radio===""?true:false}
            helperText={radio===""?"Please enter":""}
            value="start" control={<Radio />} label="Start" />
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
              error={radio===""?true:false}
            helperText={radio===""?"Please enter":""}
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
              error={radio===""?true:false}
            helperText={radio===""?"Please enter":""}
            />
          </RadioGroup>
        </div>
        <div className={classes.btn}>
          <Button   disabled={heading===""||description===""||radio===""?true:false} onClick={handleClick} style={{fontSize:"20px"}} variant="contained">
            SUBMIT
          </Button>
        </div>
      </Container>
    </>
  );
};

export default InputTodo;
