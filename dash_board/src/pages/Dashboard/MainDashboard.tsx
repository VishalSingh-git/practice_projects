import { Box, Divider, Link, makeStyles } from "@material-ui/core";
import {
  AppBar,
  Badge,
  Collapse,
  Container,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";


import NavigationDrawer from "./DashboardItems/NavigationDrawer/NavigationDrawer";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  MainContainer: {

    marginLeft:250,

  }
  ,
  Outlet: {
    backgroundColor: "gray",
    // margin: "0 0 0 250px",
    // width: "80vw",
    // float: "left",
  }
  ,


});

const MainDashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.MainContainer}>



      <NavigationDrawer />



      <Box className={classes.Outlet}>
          <Outlet />
        </Box>




     <Box> <Paper sx={{ border: "1px solid #e0e0e0" }} >
      <Container maxWidth="md">
        <Grid container direction={"row"} gap={2} >
          <Grid item>
            <Link href="#" variant="body2">
              Home
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" >
              Company
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" >
              Portfolio
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" >
              Blog
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" >
          © Creative Tim, made with love for a better web
        </Typography>
      </Container>
    </Paper></Box>
    </Box>
  );
};

export default MainDashboard;
