import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { Grid, Pagination } from "@mui/material";
import NewsBlogs from "./NewsBlogs";
import calculatePaginationValues from "./Pgination";

const useStyles = makeStyles({
  main_container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "gray",
  },
  nav_bar: {
    display: "flex",
    marginBottom: "20px",
  },
  news_blog_container: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    backgroundColor: "gray",
  },

  pagination: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});

interface HomeState {
  newsData: any[];
  currentPage: number;
}

const Home: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = useState<HomeState>({
    newsData: [],
    currentPage: 1,
  });

  const itemsPerPage = 12;
  const { currentItems, totalPages } = calculatePaginationValues(
    state.newsData,
    itemsPerPage,
    state.currentPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setState((prev) => ({ ...prev, currentPage: value }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=2b5a2e24a3cf456e93e6e5c158fa2fb0"
      );

      setState((prev) => ({ ...prev, newsData: response?.data.articles }));
    } catch (error) {
      console.log("Error fetching newsData: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.main_container}>
      <AppBar position="static">
        <Toolbar className={classes.nav_bar}>
          <ArticleIcon />

          <Typography variant="h4">News Blog Articles</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.content}>
          <Grid container className={classes.news_blog_container} spacing={1}>
            <NewsBlogs data={currentItems} />
          </Grid>
        </div>

        <Box className={classes.pagination}>
          <Pagination
            sx={{ p: 1 }}
            color="primary"
            size="large"
            count={totalPages}
            page={state.currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </div>
    </div>
  );
};

export default Home;
