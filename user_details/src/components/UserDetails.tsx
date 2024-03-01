import { AppBar, makeStyles } from "@material-ui/core";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { error } from "console";
import React, { useContext, useEffect, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../GlobalContext";

const useStyles = makeStyles({
  appBar: {},
  bodyContainer: { height: "100%" },
  mainGridContainer: {
    alignItems: "center",

    // marginTop: "20px",
  },
  gridItem: {
    overflow: "hidden",
    border: "1px solid black",
    borderRadius: "10px",
    width: "30%",

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  cardItem: {},
});

interface User {
  id: number;
  name: string;
  address: {
    zipcode: string;
  };
  company: {
    name: string;
  };
}

const UserDetails: React.FC = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [userData, setUserData] = useState<User[]>([]);
  const value = useContext(UserContext);

  console.log("Value>>>>>>>", value);

  async function fetchUserData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      setUserData(response?.data);
    } catch (error) {
      console.log("Failed to fetch user data", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const getUserDetails = (newData: any) => {
    value?.handleData(newData);
    navigate("/user")
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <Typography variant="h4">News Blog Articles</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.bodyContainer}>
        <Grid container className={classes.mainGridContainer} gap={3}>
          {userData?.map((user: any) => {
            return (
              <Grid
                item
                className={classes.gridItem}
                onClick={() => getUserDetails(user)}
              >
                <Card className={classes.cardItem}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      gutterBottom
                    >
                      Name: {user?.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Zip Code : {user?.address?.zipcode}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Company Name : {user?.company?.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default UserDetails;
