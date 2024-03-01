import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  makeStyles,
} from "@material-ui/core";
import {

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 350,
    padding: "5px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});

const ListTodo = (a) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedToDo, setEditedToDo] = useState({
    id: "",
    heading: "",
    description: "",
    status: "",
  });

  let [data, setData] = useState([]);


  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  },[data])

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      const jsonData = JSON.parse(data);
      setData(jsonData);
    //  console.log(jsonData)
    }

  }, []);




  let handleDelete = (id, index) => {
    alert("Are you sure you want to delete");

      let updateData = data.filter((elem, ind) => {
        return index !== ind;
      });
      setData(updateData);
 };

  let handleEdit = (item) => {
    setEditedToDo({
      id: item.id,
      heading: item.heading,
      description: item.description,
      status: item.status,
    });
    setIsEditable(true);
  };

  const editValues = (e) => {
    if (e.target.id === "heading") {
      setEditedToDo({ ...editedToDo, heading: e.target.value });
    }
    if (e.target.id === "desc") {
      setEditedToDo({ ...editedToDo, description: e.target.value });
    }
  };
  const editStatus = (e) => {
    setEditedToDo({ ...editedToDo, status: e.target.value });
  };

  const saveData = (e) => {
    let newData = JSON.parse(localStorage.getItem("todos"));
    let newId = editedToDo.id;

    const finalData = newData.map((element, i) => {
      if (element.id === newId) {
        return (element = editedToDo);
      }
      return element;
    });

    localStorage.setItem("todos", JSON.stringify(finalData));
    setIsEditable(false);
  };

  const clearStorage = () => {
    // setData([]);
    // localStorage.clear();
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <button
          style={{ padding: "5px 10px", margin: "10px 30px" }}
          onClick={clearStorage}
        >
          ClearALL
        </button>
      </div>

      <div className="list">
        <Typography
          variant="h3"
          gutterBottom
          style={{ textAlign: "center", color: "blue" }}
        >
          My List
        </Typography>
        <TableContainer style={{border:"2px solid"}}>
          <Table  sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead >
            <TableRow>
              <TableCell align="right" > ID </TableCell>
              <TableCell align="right" >
                {" "}
                HEADING
              </TableCell>
              <TableCell  align="right">
                DESCRIPTION
              </TableCell>
              <TableCell align="right">

                STATUS
              </TableCell>
              <TableCell
  align="right"
              >
                {" "}
                EDIT/DELETE
              </TableCell>
            </TableRow>
          </TableHead>


        <TableBody

        >
          {data?.map((item, index) => (
            <TableRow key={index}
            >
              <TableCell align="right">{item.id}</TableCell>
              <TableCell align="right">{item.heading}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right"> <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  style={{ color: "blue" }}
                  onClick={() => {
                    handleEdit(item);

                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(item.id, index)}
                >
                  Delete
                </Button>
              </ButtonGroup></TableCell>


            </TableRow>
          ))}
        </TableBody>
        </Table></TableContainer>
      </div>
      {
        <div>
          <Modal
            open={isEditable}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.box}>
              <div>
                <h2>Edit Value</h2>
                <div

                >
                  <div>
                    <div>
                      {" "}
                      <TextField
                        id="heading"
                        label="Heading"
                        variant="standard"
                        value={editedToDo.heading}
                        onChange={editValues}
                      />
                    </div>
                    <div>
                      <TextField
                        id="desc"
                        label="Description"
                        variant="standard"
                        value={editedToDo.description}
                        onChange={editValues}
                      />
                    </div>
                  </div>
                  <Typography
                    // style={{ textAlign: "center", color: "blue" }}
                    variant="h6"
                    gutterBottom
                    mt={3}
                  >
                    STATUS
                  </Typography>
                  <div>
                    <RadioGroup
                      row
                      id="status"
                      aria-label="options"
                      name="options"
                      value={editedToDo.status}
                      onChange={editStatus}
                    >
                      <FormControlLabel
                        value="start"
                        control={<Radio />}
                        label="Start"
                      />
                      <FormControlLabel
                        value="pending"
                        control={<Radio />}
                        label="Pending"
                      />
                      <FormControlLabel
                        value="completed"
                        control={<Radio />}
                        label="Completed"
                      />
                    </RadioGroup>
                  </div>
                  <div style={{ textAlign: "center",marginTop:"5px" }}>
                    <Button
                      onClick={saveData}
                      varient="contained"

                      style={{ textAlign: "center", color: "white" ,backgroundColor:"blue"  }}
                    >
                      SAVE DATA
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      }
    </div>
  );
};

export default ListTodo;
