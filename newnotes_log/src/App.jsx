import {
  AppBar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,

  Paper,
  TextField,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ListIcon from "@mui/icons-material/List";
import AppsIcon from "@mui/icons-material/Apps";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

import React, { useEffect, useState } from "react";
import NotesList from "./NotesList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles({
  icons: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  side_body: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(120, 120, 120)",
  },
  side_menu: {
    backgroundColor: "lightgray",
    height: "90vh",

     maxWidth: "100%",

    overflow: "auto",
  },

  list_icon: {
    padding: "10px",
    paddingRight: "50px",
  },
  notes: {
    paddingLeft: "50px",
  },
  card: {
    maxWidth: 700,
    margin: "150px 200px",
  },
  card_btn: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  list_items: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "10px",
    fontWeight: "bold",
    fontSize: "20px",
  },

});

const App = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [isAllCards, setIsAllCards] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isCardEditable, setIsCardEditable] = useState(false);
  const [editIndex, setEditIndex] = useState(null);



  useEffect(() => {
    let notes=(JSON.parse(localStorage.getItem('notes'))||[])
    setNotesList(notes);
    // toast("Hello world!")
    },[])

    const handleNotesLog = () => {
    console.log("notes ARRAY", notesList);
    let updatedNotesList = [...notesList, notes];

    setNotesList(updatedNotesList);
    localStorage.setItem("notes", JSON.stringify(updatedNotesList))
    setNotes("");
    setIsCard(false);
  };

  const handleListItems = (index) => {
    const editedList=[...notesList]


    setNotes(editedList[index])

    setEditIndex(index);
    setIsCardEditable(true);
    setIsCard(true);
  };

  const deleteCardItems = (editIndex) => {
      if(window.confirm('Are you sure you want to delete')) {
      alert("you have accpeted it")

    } else {
      alert("you have rejected it")
    }

    let newList = [...notesList];
    let filteredList = newList.filter((item, index) => {
      return index !== editIndex;
    });
    setNotesList(filteredList);
    localStorage.setItem("notes", JSON.stringify(filteredList))
    setEditIndex(null)
    setIsCard(false);
  };

  const editCardItems = (index) => {
  //  if(editIndex!==null){
    const editedList=[...notesList]

   editedList[index]=notes;

   setNotesList(editedList);
   localStorage.setItem("notes", JSON.stringify(editedList))
   setEditIndex(null)
   setIsCard(false);

  //  setIsCardEditable(false);
  //  }
  };

  return (
    <>
    <div className="main_container">
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item className={classes.icons} sm={2}>
              <ListIcon
                className={classes.list_icon}
                onClick={() => {
                  setIsAllCards(false);
                }}
              />

              <AppsIcon
                onClick={() => {
                  setIsAllCards(true);
                }}
              />
            </Grid>
            <Grid item style={{ alignSelf: "stretch", color: "white" }}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item sm={9}>

              <EditCalendarOutlinedIcon
                onClick={() => {
                  setIsCard((prev) => !prev);
                }}
                className={classes.notes}
              />

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {isAllCards ? (
        <NotesList notesList={notesList} />
      ) : (
        <div className="main_body">
          <Grid container spacing={1}>

            <Grid item xs={12} sm={2} className={classes.side_bar}>
              <Paper className={classes.side_menu}>
                <List className={classes.list}>
                  <ol>
                    {notesList.map((note, index) => {
                      return (
                        <li
                          key={index}
                          className={classes.list_items}
                          onClick={() => {
                            handleListItems(index);
                          }}
                        >
                          {index + 1}: {note}{" "}
                        </li>
                      );
                    })}
                  </ol>
                </List>
              </Paper>
            </Grid>


            <Grid item xs={12} sm={10}>
              <Paper className={classes.side_body}>
                {isCard && (
                  <div>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Write Notes
                        </Typography>
                        <TextField
                          multiline
                          fullWidth
                          rows={8}
                          variant="outlined"
                          placeholder="Write your notes here..."
                          value={notes}
                          onChange={(e) => {
                            setNotes(e.target.value);
                          }}
                          // onChange={handleNotesInput}
                        />
                      </CardContent>
                      <div className={classes.card_btn}>
                        <Button
                          disabled={notes === ""&&editIndex}
                          variant="contained"
                          onClick={handleNotesLog}
                        >
                          Done
                        </Button>
                        {isCardEditable ? (
                          <div>
                            <Button  onClick={()=>editCardItems(editIndex)} >Edit</Button>
                            <Button onClick={() => deleteCardItems(editIndex)}>
                              Delete
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>

    </>

  );
};

export default App;
