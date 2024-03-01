import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import weatherData from "../weatherData.json";

interface CountryDataProps {
  name: string;
  capital: string;
  population: number;
  latlng: number;
  flag: string;
  open: boolean;
  details:any
}
interface WeatherDataProps {
  capital_of_country: string;
  temperature: number;
  weather_icons: string;
  wind_speed: number;
  precip: number;
}
const useStyles = makeStyles({
  country_info: {
    paddingLeft: "10px",
    display: "flex",
    flexWrap: "wrap",
  },
  image_container: { maxWidth: "15%", height: "auto" },
  card_container: {
    maxWidth: "40%",
    height: "auto",
    paddingLeft: "20px",
    paddingRight: "10px",
  },
  info_box: { paddingLeft: "10px" },
  Card_box: { background_color: "red", paddingLeft: "10px" },
  weatherinfo_container: {
    border: "1px solid black",
    maxWidth: "auto",
    height: "auto",
    paddingLeft: "20px 10px",
    marginTop: "10px",
  },
  weather_heading: {
    textAlign: "center",
  },
  clear_btn: {
    background_color: "blue",
    color: "red",
  },
  goback_btn: {
    background_color: "blue",
    color: "green",
  },
  country_info_container: {
    margin: "50px auto 0 auto",
  },
});

const CountryInfo: React.FC = () => {
  const location = useLocation();
  const countryName = location.state as CountryDataProps;
  const [countryData, setCountryData] = useState<CountryDataProps[]>([]);
  // const [displayWeather, setDisplayWeather] =  useState<{ [key: string]: boolean }>({});
  const [WeatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

  const classes = useStyles();

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${countryName}`
      );
      setCountryData(response?.data);
    } catch (error) {
      console.log("Error Fetching country data", error);
    }
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchWeatherData = (capital: string) => {
    // console.log(countries)
    const index = countryData?.findIndex((item) => item.capital === capital);
    let tempArray = [...countryData];

    if (capital === "New Delhi") {
      tempArray[index] = { ...tempArray[index], details: weatherData[0],open :true};
      setCountryData(tempArray)
      console.log(countryData)

    }
   if(capital==='Diego Garcia'){
      tempArray[index] = { ...tempArray[index], details: weatherData[1],open:true };
      setCountryData(tempArray)
    }
  };


  const handleClear = (capital:string) => {
    const index = countryData?.findIndex((item) => item.capital === capital);
    let tempArray = [...countryData];

    if (capital === "New Delhi") {
      tempArray[index] = { ...tempArray[index], details: weatherData[0],open :false};
      setCountryData(tempArray)
      console.log(countryData)
      //  console.log(tempArray)
    }
   if(capital==='Diego Garcia'){
      tempArray[index] = { ...tempArray[index], details: weatherData[1],open:false };
      setCountryData(tempArray)
    }
    // setWeatherData(null);
  };


  return (
    <Grid container spacing={2}>
      <div>
        <Link to="/">
          <Button className={classes.goback_btn}>Go Back </Button>
        </Link>
      </div>
      {countryName ? (
        <div className={classes.country_info_container}>
          <Grid item spacing={3} className={classes.country_info}>
            {countryData?.map((elem: CountryDataProps, index: number) => {
              //  setCountryData(countries)
              console.log("Map Details",elem.details?.temperature)

              return (
                <Grid container className={classes.card_container} key={index}>
                  <Grid item>
                    <Card className={classes.Card_box}>
                      <div className={classes.info_box}>
                        <Typography>COUNTRY -{elem.name} </Typography>
                        <Typography>Capital-{elem.capital} </Typography>

                        <div className="image_container">
                          <img
                            src={elem.flag}
                            alt="Example Image"
                            className={classes.image_container}
                          />
                        </div>
                      </div>

                      <CardContent>
                        <Typography>Population: {elem.population}</Typography>
                        <Typography>Latlang : {elem.latlng}</Typography>

                        <Button
                          variant="contained"
                          onClick={() => fetchWeatherData(elem.capital)}
                        >
                          Capital Weather
                        </Button>

                        {
                          // isWeatherOpen &&
                          countryData[index]?.open &&
                           (
                            <Grid container>
                              <Card className={classes.weatherinfo_container}>
                                <h3 className={classes.weather_heading}>
                                  Weather Information
                                </h3>
                                <div>
                                  <CardContent>
                                    <Typography>

                                      TEMPRATURE =  {elem.details?.temperature}
                                    </Typography>
                                    <div>
                                      <Typography>
                                        weather_icons ={elem.details?.weather_icons}

                                      </Typography>
                                    </div>

                                    <Typography>
                                      WIND_SPEED ={elem.details?.wind_speed}
                                    </Typography>
                                    <Typography>
                                      PRECIP ={elem.details?.precip}
                                    </Typography>
                                  </CardContent>
                                </div>
                                <div>
                                  <Button
                                    className={classes.clear_btn}
                                    onClick={() => {
                                      handleClear(elem.capital);
                                    }}
                                  >
                                    Clear
                                  </Button>
                                </div>
                              </Card>
                            </Grid>
                          )
                        }
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Grid>
  );
};

export default CountryInfo;
