

import { makeStyles } from "@material-ui/core";
import { Card} from "@mui/material";
import { useRef, useState } from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const useStyles=makeStyles({
  Map:{
    height: "600px",
    width: "100%",
    border: "1px solid #e0e0e0"
  }
})

const MapDashboard = () => {
 const  classes=useStyles()
//  const [center,setCenter]=useState({lat:})
  const center = [13.084622, 80.248357] as [number, number];
  const zoom = 10 as number;
  const mapRef:any=useRef()



  return (
   <Card   className={classes.Map}>
    <MapContainer zoom={zoom} center={center}
     scrollWheelZoom={false} ref={mapRef}

    //  style={{height: '100vh',width: '100vw'}}

     >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=fwdEPnkRYclqe0zKVFJP"
          attribution="© OpenStreetMap contributors"
        />
      </MapContainer>
   </Card>




  );
};

export default MapDashboard;



