import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../GlobalContext";

interface GeoLocationData {
  address: {
    geo: {
      lat: string;
      lng: string;
    };
  };
}
const GeoLocation: React.FC = () => {

  const navigate=useNavigate();
  const value = useContext(UserContext);
  const userData=value?.data



  return (
    <Box sx={{ width: 400, padding:'1rem'}}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Geo Location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Latitude:</strong> {userData?.address?.geo?.lat}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Longitude:</strong> {userData?.address?.geo?.lng}
          </Typography>
          <CardActions>
        <Button  variant="contained" size="small" onClick={()=>navigate("/user")}>Back</Button>

      </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GeoLocation;
