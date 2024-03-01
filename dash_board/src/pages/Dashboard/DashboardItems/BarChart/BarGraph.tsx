import React from 'react';

import { Card, Divider } from '@mui/material';
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import { Box, Typography, makeStyles } from '@material-ui/core';

ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend)
const useStyles=makeStyles({
BarGraph:{
  width:"100%",
  height:"100%",
  border: "1px solid #e0e0e0"


}
})
const BarChart = () => {
const classes=useStyles()
  const data:any={
    labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets:[{
      label:"Revenue",
      data:[500,400,300,700,600,550,450,500,600,700,800,900],
      backgroundColor:"aqua",
      borderWidth:1
    },{
      label:"Loss",
      data:[300,250,300,500,550,500,350,400,500,600,700,800],
      backgroundColor:"red",
      borderWidth:1

    }]

  }
  const options={

  }

  return (
    <Box  className={classes.BarGraph}   >
      <Typography variant='h5'>2017 Sales</Typography>
    <Typography variant='body1' color="textSecondary"> All products including Taxes</Typography>

    <Bar data={data} options={options}></Bar>


    <Divider/>
    <Typography variant='body1' color="textSecondary"> Data information certified</Typography>
    </Box>
  );
};

export default BarChart;
