// import { makeStyles } from "@material-ui/core";
// import { Card, Grid } from "@mui/material";
// import React from "react";
// import Graph from "../LineChart/LineGraph";
// import { VictoryPie } from "victory";
// const useStyles = makeStyles({
//   BarGraph: {},
//   PieChart:{
// padding:"5px",
//   }
// });

// const myData = [
//   { x: "PHP", y: 900 },
//   { x: "Python", y: 400 },
//   { x: "Javascript", y: 300 },
// ];

// const PieChart = () => {
//   const classes = useStyles();
//   return (
//    <Card className={classes.PieChart}>
//      <Grid container >
//       <Grid item>
//       <VictoryPie data={myData}
//       colorScale={["blue","yellow","red"]}
//       radius={100}/>
//       </Grid>

//     </Grid>
//    </Card>
//   );
// };

// export default PieChart;

import { Box, Divider, Typography } from "@material-ui/core";
import {  Card } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Open", "Bounce", "Unsubscribe"],
    datasets: [
      {
        data: [40, 20, 40],
        backgroundColor: ["orange", "red", "aqua"],
      },
    ],
  };

  const options = {};

  return (
    <Box style={{ padding: "20px", width: "50vh", border: "1px solid #e0e0e0" }}>

      <Typography variant="h5"> Email Statics</Typography>
      <Typography variant="body1" color="textSecondary">Last Campaign Performance</Typography>
      <Pie data={data} options={options}></Pie>
      <Divider/>
    <Typography variant="body1"  color="textSecondary"> Campaign sent 2 days ago</Typography>
    </Box>
  );
};

export default PieChart;
