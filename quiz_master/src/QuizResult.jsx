import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VictoryPie } from "victory";

const useStyles = makeStyles({
  pie_chart: {
    border: "2px solid black",
    height: "50%",
    width: "50%",
    margin: "20px auto",
  },
  table: {
    border: "1px solid black",
  },
});

const QuizResult = () => {
  const classes = useStyles();
  const location = useLocation();
  const resultData = location?.state.data;

  console.log(resultData);

  const [quizResult, setQuizResult] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    percentageScore: 0,
    pieChartData: null,
  });

  function findResult() {
    const totalQuestions = resultData.length;
    let correctAnswer = 0;
    resultData.forEach((question) => {
      if (question.correct_answer === question.answered_option) {
        correctAnswer++;
      }
    });

    const percentageScore = (correctAnswer / totalQuestions) * 100;
    const incorrectAnswers = totalQuestions - correctAnswer;
    const pieChartData = [
      { x: "correctAnswers", y: correctAnswer },
      { x: "wrongAnswers", y: incorrectAnswers },
    ];

    setQuizResult({
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswer,
      incorrectAnswers: incorrectAnswers,
      percentageScore: percentageScore,
      pieChartData: pieChartData,
    });
  }

  useEffect(() => {
    findResult();
  }, []);

  return (
    <Container>
      <Box>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Total No of Questions</TableCell>
                <TableCell>Correct Answers</TableCell>
                <TableCell>Incorrect Answers</TableCell>
                <TableCell>Score Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{quizResult?.totalQuestions}</TableCell>
                <TableCell>{quizResult?.correctAnswers}</TableCell>
                <TableCell>{quizResult?.incorrectAnswers}</TableCell>
                <TableCell>{quizResult?.percentageScore}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {console.log(quizResult.pieChartData, "pie")}
      <Box className={classes.pie_chart}>
        <VictoryPie
          data={quizResult?.pieChartData}
          colorScale={["green", "red"]}
          radius={100}
        />
      </Box>
    </Container>
  );
};

export default QuizResult;
