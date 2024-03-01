import { Button, Container, Grid, Paper, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  main_container: {
    backgroundColor: "gray",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",

  },
  image_paper: {
    padding: "20px",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "80vh",
    objectFit: "cover",
  },
  btn_container: {
    backgroundColor: "white",

    height:"50px",
    display: "flex",
    justifyContent: "space-around",

  },
});

const ImageSlider = () => {
  const classes = useStyles();

  let [dogImages, setDogImages] = useState([]);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchDogImages();
  }, []);

  const fetchDogImages = async () => {
    try {
      let response = await fetch("https://dog.ceo/api/breeds/image/random");
      let data = await response.json();
      let imageUrl = data?.message;
        console.log(imageUrl,"Apicalled");
      setDogImages([...dogImages, imageUrl]);
    } catch (error) {
      console.log("Failed to fetch Dog Api", error);
    }
  };

  const handleNextCLick = () => {
   if(currentImageIndex<dogImages.length-1){
    setCurrentImageIndex(currentImageIndex + 1);
   }
   else{
    fetchDogImages();
    setCurrentImageIndex(currentImageIndex + 1);

   }



// fetchDogImages();
// setCurrentImageIndex(currentImageIndex + 1);

  };

  const handlePreviousClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  console.log(dogImages);

  return (
    <Container className={classes.main_container}>
      <Grid container>
        <Grid item xs={12}  >
          <Paper className={classes.image_paper}>
            <img src={dogImages[currentImageIndex]} className={classes.image} />
          </Paper>
        </Grid>
        <Grid item xs={12}  direction="row" className={classes.btn_container}>
          <Button
            onClick={handlePreviousClick}
            disabled={currentImageIndex === 0}
          >
            Previous
          </Button>
          <Button  onClick={handleNextCLick}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ImageSlider;
