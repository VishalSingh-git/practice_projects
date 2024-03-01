import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography, styled } from "@mui/material";
// import { makeStyles } from '@material-ui/core';
// import{ makeStyles} from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  heading: {
    textAlign: "center",
    color: "darkblue",
  },
  table_head: {
    border: "1px solid black",
    color: "red",
    backgroundColor: "orange",
    fontSize: "20px",
  },
  table_body: {
    border: "1px solid black",

    backgroundColor: "lightgray",
  },
  head_content: {
    color: "red",
  },
  btn: {
    backgroundColor: "orange",
    border: "1px solid black",
    color: "red",
  },
  btn_container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "orange",
  },
});

const App = () => {
  const classes = useStyles();

  const [employeeDetails, setEmpDetails] = useState([
    {
      empId: "",
      empName: "",
      empDesignation: "",
    },
  ]);
  useEffect(() => {
    const storedEmployeeDetails = JSON.parse(
      localStorage.getItem("EMPLOYEE_DETAILS")
    ) || [
      {
        empId: "",
        empName: "",
        empDesignation: "",
      },
    ];
    if (storedEmployeeDetails.length === 0) {
      storedEmployeeDetails.push({
        empId: "",
        empName: "",
        empDesignation: "",
      });
    }
    setEmpDetails(storedEmployeeDetails);
  }, []);

  const handleInputChange = (index, inputField, value) => {
    const newEmployeeDetails = [...employeeDetails];

    console.log(newEmployeeDetails);
    newEmployeeDetails[index] = {
      ...newEmployeeDetails[index],
      [inputField]: value,
    };
    setEmpDetails(newEmployeeDetails);

    localStorage.setItem(
      "EMPLOYEE_DETAILS",
      JSON.stringify(newEmployeeDetails)
    );
  };

  const addNewRow = () => {
    setEmpDetails([
      ...employeeDetails,
      { empId: "", empName: "", empDesignation: "" },
    ]);
  };

  const deleteRow = (index) => {
   if(employeeDetails.length>1){ const newEmployeeDetails = [...employeeDetails];
    newEmployeeDetails.splice(index, 1);
    setEmpDetails(newEmployeeDetails);
    localStorage.setItem(
      "EMPLOYEE_DETAILS",
      JSON.stringify(newEmployeeDetails)
    )}
  };
  const clearLocalStorage = () => {
    localStorage.removeItem("EMPLOYEE_DETAILS");

    setEmpDetails([
      {
        empId: "",
        empName: "",
        empDesignation: "",
      },
    ]);
  };

  return (
    // <MyComponent>
    <div>
      <Typography className={classes.heading} variant="h3" component="h2">
        EMPLOYEE DETAILS
      </Typography>
      <TableContainer
        className={classes.container}
        component={Paper}
        sx={{ minWidth: 400 }}
        aria-label="simple table"
      >
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.table_head}>
              <TableCell className={classes.head_content}>
                {" "}
                Employee Id
              </TableCell>
              <TableCell align="right"> Employee Name</TableCell>
              <TableCell align="right">Employee Designation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.table_head}>
            {employeeDetails.map((item, index) => (
              <TableRow className={classes.table_body} key={index}>
                <TableCell component="th" scope="row">
                  <TextField
                    id={`empId-${index}`}
                    label="Employee Id"
                    variant="outlined"
                    value={item.empId}
                    onChange={(e) =>
                      handleInputChange(index, "empId", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id={`empName-${index}`}
                    label="Employee Name"
                    variant="outlined"
                    value={item.empName}
                    onChange={(e) =>
                      handleInputChange(index, "empName", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id={`empDesignation-${index}`}
                    label="Employee Designation"
                    variant="outlined"
                    value={item.empDesignation}
                    onChange={(e) =>
                      handleInputChange(index, "empDesignation", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => deleteRow(index)}
                    color="secondary"
                    // disabled={item.empId === ""&&(employeeDetails.length<=1)}
                    disabled={employeeDetails.length === 1 }
                  >
                    Remove Row
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.btn_container}>
          {" "}
          <Button  color="primary" className={classes.btn} onClick={addNewRow}>
            Add new Row
          </Button>
          <Button onClick={clearLocalStorage}>Clear</Button>
        </div>
      </TableContainer>
    </div>
    //  </MyComponent>
  );
};

export default App;
