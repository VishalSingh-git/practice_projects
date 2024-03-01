
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField , styled } from '@mui/material';
// import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

// const useStyles=makeStyles  ({
//   container:{backgroundColor:"red"}
// })



// const MyComponent=styled("div")({
//  background:"red",
//  color:"green",
//  height:"100%",
// })

const App = () => {

  // const classes=useStyles();

  const [employeeDetails, setEmpDetails] = useState([
    {
      empId: '',
      empName: '',
      empDesignation: '',
    },
  ]);
  useEffect(() => {

    const storedEmployeeDetails = JSON.parse(localStorage.getItem('EMPLOYEE_DETAILS')) || [
      {
        empId: '',
        empName: '',
        empDesignation: '',
      },
    ];
    setEmpDetails(storedEmployeeDetails);
  }, []);

  const handleInputChange = (index, inputField, value) => {
    const newEmployeeDetails = [...employeeDetails];

    console.log(newEmployeeDetails)
    newEmployeeDetails[index] = { ...newEmployeeDetails[index], [inputField]: value };
    setEmpDetails(newEmployeeDetails);


    localStorage.setItem('EMPLOYEE_DETAILS', JSON.stringify(newEmployeeDetails));
  };

  const addNewRow = () => {
    setEmpDetails([...employeeDetails, { empId: '', empName: '', empDesignation: '' }]);


  };

  const deleteRow = (index) => {
    const newEmployeeDetails = [...employeeDetails];
    newEmployeeDetails.splice(index, 1);
    setEmpDetails(newEmployeeDetails);
   localStorage.setItem('EMPLOYEE_DETAILS', JSON.stringify(newEmployeeDetails));
  };
  const clearLocalStorage = () => {

    localStorage.removeItem('EMPLOYEE_DETAILS');

    setEmpDetails([
      {
        empId: '',
        empName: '',
        empDesignation: '',
      },
    ]);
  };


  return (
    // <MyComponent>
   <div>
     <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Employee Id</TableCell>
            <TableCell align="right"> Employee Name</TableCell>
            <TableCell align="right">Employee Designation</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeDetails.map((item, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
              <TableCell component="th" scope="row">
                <TextField
                  id={`empId-${index}`}
                  label="Employee Id"
                  variant="outlined"
                  value={item.empId}
                  onChange={(e) => handleInputChange(index, 'empId', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id={`empName-${index}`}
                  label="Employee Name"
                  variant="outlined"
                  value={item.empName}
                  onChange={(e) => handleInputChange(index, 'empName', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id={`empDesignation-${index}`}
                  label="Employee Designation"
                  variant="outlined"
                  value={item.empDesignation}
                  onChange={(e) => handleInputChange(index, 'empDesignation', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteRow(index)} color="secondary" disabled={item.empId===""}      >
                  Remove Row
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button  onClick={addNewRow}>Add new Row</Button>
      <Button onClick={clearLocalStorage}>Clear Local Storage</Button>
    </TableContainer>
   </div>
  //  </MyComponent>
  );
};

export default App;
