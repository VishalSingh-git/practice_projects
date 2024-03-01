import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../GlobalContext";




const UserAddress: React.FC = () => {



  const value = useContext(UserContext);

const userData=value?.data






  const navigate = useNavigate();

  const handleGeoLocation=()=>{

      navigate(`/user/geo`);

  }


  return (
    <Box sx={{ width: 400, padding:'1rem'}}>
      <Card sx={{bgcolor:"#efefef",padding: "1rem" }}>
        <CardContent>
          <h3>{userData?.name}</h3>
          <h4>Address :</h4>
          <Typography  variant="h6"  gutterBottom>
            Street: {userData?.address?.street}
          </Typography>
          <Typography variant="h6" component="div">
            suite: {userData?.address?.suite}
          </Typography>
          <Typography  variant="h6">
            city: {userData?.address?.city}
          </Typography>
          <Typography variant="h6" >
            zip code :{userData?.address?.zipcode}
            <br />

          </Typography>
          <CardActions>
        <Button  variant="contained" size="small" onClick={()=>navigate("/")}>Back</Button>
        <Button  variant="contained"  size="small"  onClick={handleGeoLocation}>Get Geo Location</Button>
      </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserAddress;
