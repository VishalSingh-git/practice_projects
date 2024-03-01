
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import React from "react";
// import makeStyles from '@mui/styles/makeStyles';



type DataItem = {
    [key: string]:any
  }[]

// const useStyles=makeSty



const HocTable = (WrappedComponent: React.ComponentType<any>, data: DataItem) => {


  return function TableComponent() {

    const keys = Object.keys(data[0]);
    const result = data.map((val: any) => {
      return Object.values(val);
    });
    console.log(result);

    return (
      <TableContainer sx={{border:"2px solid black"}}>
        <Table>
          <TableHead    sx={{backgroundColor:"blue"}}>
            <TableRow >
              {keys.map((keys) => (
                <TableCell >{keys}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row: any) => {
              return (
                <TableRow    sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                  {row.map((value: any) => {
                    return <TableCell>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
};

export default HocTable;
