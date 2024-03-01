import { Box, Grid } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'
import MapDashboard from '../Map/MapDashboard';
import { Typography } from '@material-ui/core';
import Flag from "react-country-flag"
const countriesData = [
  { code: 'US', location: 'United States', sales: 2920, percentage: '53.23%' },
  { code: 'DE', location: 'Germany', sales: 1300, percentage: '20.43%' },
  { code: 'AU', location: 'Australia', sales: 760, percentage: '10.35%' },
  { code: 'GB', location: 'United Kingdom', sales: 690, percentage: '7.87%' },
  { code: 'RO', location: 'Romania', sales: 600, percentage: '5.94%' },
  { code: 'BR', location: 'Brasil', sales: 550, percentage: '4.34%' },
];

const GlobalSalesCountries = () => {
  return (

    <Grid item  sx={{height:"100%", border: "1px solid #e0e0e0"}}>
      <Typography variant='h5'>Global Sales by Top Locations</Typography>
      <Typography variant='body1' color="textSecondary">All products that were shipped</Typography>
    <TableContainer   >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countriesData.map((country, index) => (
            <TableRow key={index} >
              <TableCell   sx={{fontSize:"1.25rem" ,gap:2,display:"flex",flexDirection:"row", alignItems:"center" }}>{<Flag  countryCode={country.code} svg/>}<Box>{country.location}</Box></TableCell>
              <TableCell>{country.sales}</TableCell>
              <TableCell>{country.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>

  )
}

export default GlobalSalesCountries
