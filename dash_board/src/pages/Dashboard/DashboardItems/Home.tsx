import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import DashboardCard from "./DashboardCard";
import { ClassNames } from "@emotion/react";
import GlobalSalesCountries from "./CountryTable/GlobalSalesCountries";
import MapDashboard from "./Map/MapDashboard";
import PieChart from "./PieChart/PieChart";
import LineGraph from "./LineChart/LineGraph";
import BarGraph from "./BarChart/BarGraph";
import TaskList from "./TaskList/TaskList";

const useStyles = makeStyles({

    MainContainer:{
        display: "flex",
        flexDirection: "column",
        rowGap:"20px",
        backgroundColor:"#FFFFFF",
    },
  Cards: {
    padding: "5px",
paddingLeft:"20px",
gap: "5px",

  },
  Table_Map: {
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height:"100%",
    width:"100%",

    justifyContent:"space-between",

  },
  Pie_Line_Chart: {

    padding: "5px",
  },
  BarGraph_TaskTable:{

  }
  ,


});
const Home = () => {
  const classes = useStyles();
  return (
    <Box   className={classes.MainContainer}>
      <Grid container className={classes.Cards}
       direction={"row"}  md={12} sm={6} >

          <DashboardCard />

      </Grid>

      <Grid container className={classes.Table_Map}   direction="row"  spacing={5}>
        <Grid item lg={4} sm={12}>
          <GlobalSalesCountries />
        </Grid>
        <Grid item lg={8} sm={12} >
          <MapDashboard />
        </Grid>
      </Grid>

      <Grid container className={classes.Pie_Line_Chart}>
        <Grid item  md={4} sm={12}>
          <PieChart />
        </Grid>
        <Grid item md={8} sm={12}>
          <LineGraph />
        </Grid>
      </Grid>

      <Grid container direction={"row"}  className={classes.BarGraph_TaskTable} >
        <Grid item  sm={12} md={5}  >
          <BarGraph />
        </Grid>

       <Grid item  sm={12} md={7} >
          <TaskList />
        </Grid>
       </Grid>

    </Box>
  );
};

export default Home;


