import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Table, TableBody, TableCell, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AsteroidIdInfoProps {}
interface YourDataType {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

const AsteroidIdInfo: React.FC<AsteroidIdInfoProps> = () => {
  const location = useLocation();

  const receivedData = location.state as YourDataType;

  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <Typography variant="h6" fontWeight="bold">
                    nasa_jpl_url
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" fontWeight="bold">
                    is_potentially_hazardous_asteroid
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivedData ? (
                <TableRow>
                  <TableCell>{receivedData.id}</TableCell>
                  <TableCell>{receivedData.name}</TableCell>
                  <TableCell align="center">
                    {receivedData.nasa_jpl_url}
                  </TableCell>
                  <TableCell align="center">
                    {receivedData.is_potentially_hazardous_asteroid.toString()}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>{<h1>"Failed to pass DATA"</h1>}</TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AsteroidIdInfo;
