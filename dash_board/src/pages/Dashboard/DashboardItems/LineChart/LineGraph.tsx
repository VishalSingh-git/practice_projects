import React from 'react'

import {Line} from "react-chartjs-2"

import {Chart as ChartJS,LineElement,CategoryScale
  ,LinearScale,PointElement,
Legend,Tooltip} from "chart.js"
import { Box, Card, Typography, makeStyles } from '@material-ui/core'
import { Divider } from '@mui/material'
ChartJS.register(LineElement,CategoryScale,
  LinearScale,PointElement,Legend,Tooltip)


  const useStyles=makeStyles({
    LineGraphCard:{
      border: "1px solid #e0e0e0",
width:"100%",
height:"100%",
    }
  })
const LineGraph = () => {

const classes=useStyles()
const data:any={
 labels:["9:00AM","12:00AM","3:00PM","6:00AM","9:00PM","12:00PM","3:00AM"],
 datasets:[{
  label:"Open",
  data:[200,400,500,600,650,700,700,600],
  backgroundColor:"primary",
  borderColor:"aqua",
  pointBorderColor:"green",

 },
 {
  label:"Click",
  data:[100,80,200,300,350,400,450,500,600,700],
  backgroundColor:"primary",
  borderColor:"red",
  pointBorderColor:"green",

 },
{ label:"Click Second Time",
data:[50,60,20,200,250,300,400,450,500,500,600],
backgroundColor:"primary",
borderColor:"orange",
pointBorderColor:"green",
}
]

}

const options={

}







  return (
   <Box className={classes.LineGraphCard}>

    <Typography variant='h5'>User Behavior</Typography>
    <Typography variant='body1' color="textSecondary">24 Hours performance</Typography>
    <Line
    data={data}
    options={options}
    ></Line>

    <Divider/>
    <Typography variant='body1' color="textSecondary"> Updated 3 minutes ago</Typography>

   </Box>
  )
}

export default LineGraph
