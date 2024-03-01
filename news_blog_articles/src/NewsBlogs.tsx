import { Box, makeStyles } from "@material-ui/core";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  author_details: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  author_name: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  gridItem: {
    height: "auto",
  },
  card: {
    margin: "10px 5px 0 5px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

interface NewsBlogsProps {
  data: {
    title: string;
    author: string;
    url: string;
    publishedAt: string;
  }[];
}

const NewsBlogs: React.FC<NewsBlogsProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      {data?.map((item, index) => {
        return (
          <Grid
            item
            key={index}
            md={3}
            sm={4}
            xs={12}
            className={classes.gridItem}
          >
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://t3.ftcdn.net/jpg/01/75/17/46/360_F_175174631_fZWpQKTkvuuXxZN6rz7x7mzjwCrhJq0o.jpg  "
                title="green iguana"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.title}
                >
                  {item?.title}
                </Typography>

                <Box className={classes.author_details}>
                  <Avatar sx={{ bgcolor: "purple" }}>O</Avatar>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    className={classes.author_name}
                  >
                    {item?.author}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Link href={item?.url} target="_blank">
                  Visite the WebSite for more Information
                </Link>
              </CardActions>
              <Typography variant="body2" color="text.secondary">
                {item?.publishedAt}
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default NewsBlogs;
