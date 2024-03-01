import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import SampleQuestions from "./SampleQuestions.json";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  main_container: {
    height: "100vh",

    background: "linear-gradient(to right, #66bb6a, #43a047)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  centerBox: {
    width: "80%",
    maxWidth: "800px",
    background: "#ffffff",
    padding: "24px",
    // backgroundColor: "red",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  questions: {
    alignItems: "center",
    margin: "16px 0",
  },

  radio_btn_container: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    // backgroundColor:"white",

    marginTop: "24px",
  },
  btn_container: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "24px",
  },
});

const App = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // const [selectedOption, setSelectedOption] = useState("");

  const [quizData, setQuizData] = useState(SampleQuestions.Questions);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentQuestionIndex < SampleQuestions.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleChange = (e) => {
    // setSelectedOption(e.target.value);

    let option = e.target.value;

    let temp = [...quizData];

    let item = { ...temp[currentQuestionIndex] };

    item.answered_option = option;

    temp[currentQuestionIndex] = item;
    console.log(item, "answer_option");

    setQuizData(temp);
  };

  return (
    <Container className={classes.main_container} component="main">
      <Box className={classes.centerBox}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6">Quiz Master</Typography>
            <Typography>Number of Questions : {quizData.length}</Typography>
          </Toolbar>
        </AppBar>

        <Box className={classes.Questions}>
          <Typography variant="h4">
            {currentQuestionIndex + 1}.{" "}
            {quizData[currentQuestionIndex].question}
            {console.log(currentQuestionIndex, "current question index")}
          </Typography>
        </Box>

        <Box className={classes.radio_btn_container}>
          <RadioGroup>
            {quizData[currentQuestionIndex].options?.map((item, index) => {
              console.log(item, index, "map options");
              return (
                <FormControlLabel
                  key={index}
                  control={<Radio />}
                  label={item}
                  // checked={selectedOption === item}
                  onChange={(e) => handleChange(e)}
                  value={item}
                />
              );
            })}
          </RadioGroup>
        </Box>

        <Box className={classes.btn_container}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={quizData.length === currentQuestionIndex + 1}
          >
            Next
          </Button>
          {quizData.length === currentQuestionIndex + 1 && (
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/quiz_result", { state: { data: quizData } });
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
