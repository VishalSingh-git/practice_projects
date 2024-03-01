import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

let useStyles = makeStyles({
  fieldContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "100px auto",
    border: "2px solid black",
    height: "400px",
    width: "50%",
    flexDirection: "column",
    gap: "50px",
    backgroundColor: "#eeeeee",
    borderRadius: "50px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
    gap: "2px",
  },
});

interface SignUpAsteroidProps {}
interface AsteroidProps {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

const SignUpAsteroid: React.FC<SignUpAsteroidProps> = () => {
  const classes = useStyles();
  const [asteroidId, setAsteroidId] = useState<string>("");

  const navigate = useNavigate();

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error:Failed to fetch Asteroid API ,error");
    }
  };

  const getAsteroidDetail = async (
    id: string
  ): Promise<AsteroidProps | null> => {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=WpOpfziW6xqsHLLcS8lOYKbbGynjkhg83M6kS8SI`;

    try {
      const data = await fetchData(url);
      return data;
    } catch (error) {
      console.error("Fetching data failed", error);
      return null;
    }
  };
  const getAllAsteroidDetails = async (): Promise<AsteroidProps[]> => {
    const url =
      "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=WpOpfziW6xqsHLLcS8lOYKbbGynjkhg83M6kS8SI";
    try {
      const data = await fetchData(url);
      return data.near_earth_objects;
    } catch (e) {
      console.error("Fetching Alldata failed", e);
      return [];
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await getAsteroidDetail(asteroidId);
      if (data) {
        navigate("/asteroid_id_info", { state: data });
      } else {
        alert("Aseroid details not found. Please enter valid ID ");
      }
    } catch (error) {
      console.error("Error:Failed to handle Asteroid details", error);
    }
  };

  const handleRandomAsteroid = async () => {
    try {
      const asteroids = await getAllAsteroidDetails();

      if (asteroids.length > 0) {
        const randomAsteroidId =
          asteroids[Math.floor(Math.random() * asteroids.length)].id;

        const data = await getAsteroidDetail(randomAsteroidId);

        if (data) {
          navigate("/asteroid_id_info", { state: data });
        } else {
          alert("Failed to fetch details of random Asteroid");
        }
      } else {
        alert("No asteroids found for random selection.");
      }
    } catch (error) {
      console.error("Error: Failed to handle Random Asteroid details ", error);
    }
  };

  return (
    <>
      <div className={classes.fieldContainer}>
        <div>
          <TextField
            label="Enter Asteroid ID"
            placeholder="Enter Asteroid ID"
            value={asteroidId}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
              setAsteroidId(e.target.value);
            }}
            error={asteroidId === "" ? true : false}
            helperText={asteroidId === "" ? "Please enter" : ""}
          ></TextField>
        </div>
        <div className={classes.btnContainer}>
          <div>
            <Button
              variant="contained"
              disabled={!asteroidId}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          <div>
            <Button onClick={handleRandomAsteroid} variant="contained">
              Random Asteroid
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export { SignUpAsteroid };
