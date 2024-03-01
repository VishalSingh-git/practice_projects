import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  notes_list: {
    height: "790px",
    overflowY: "auto", // Add overflow for scrolling if needed
  },
  notes_field: {
    height: "790px",
    padding: theme.spacing(2),
  },
  btn_container: {
    display: "flex",
    marginTop: "15px",
  },
  display_notes: {
    border: "1px solid red",
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showFullNotes, setShowFullNotes] = useState(false);

  useEffect(() => {
    // Load notes from local storage on component mount
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = () => {
    if (noteInput.trim() !== "") {
      if (editingIndex !== null) {
        // If editing, update the existing note
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = noteInput;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        // If not editing, add a new note
        const newNotes = [...notes, noteInput];
        setNotes(newNotes);
      }

      localStorage.setItem("notes", JSON.stringify(notes));
      setNoteInput("");
    }
  };

  const editNote = (index) => {
    setNoteInput(notes[index]);
    setEditingIndex(index);
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setEditingIndex(null); // Clear editing state if a note is deleted
  };

  const toggleFullNotes = () => {
    setShowFullNotes((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className={classes.card}>
            <CardContent>
              <Button
                variant="outlined"
                color="primary"
                onClick={toggleFullNotes}
                fullWidth
              >
                {showFullNotes ? "Hide Full Notes" : "Show Full Notes"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">NOTES LOG</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={addNote}
                style={{ marginTop: "10px" }}
                fullWidth
              >
                {editingIndex !== null ? "Update Note" : "Add Note"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className={classes.notes_list}>
            <CardContent>
              <Typography variant="h6">Previous Notes</Typography>
              <ul>
                {notes.map((note, index) => (
                  <li
                    key={index}
                    onClick={() => editNote(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {`${note.substring(0, 15)}...`}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <Card className={classes.notes_field}>
            <CardContent>
              <Typography variant="h6">Current Notes</Typography>
              <TextField
                label="Write your note"
                variant="outlined"
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Enter your note..."
                fullWidth
                margin="normal"
                style={{ marginBottom: "20px" }}
              />

              {showFullNotes && (
                <div>
                  <Typography variant="h6">All Previous Notes</Typography>
                  <Grid container spacing={2}>
                    {notes.map((note, index) => (
                      <Grid item key={index} xs={12} md={6} lg={3}>
                        <Card className={classes.display_notes}>
                          <CardContent>
                            <div>
                              {note}
                              <div className={classes.btn_container}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => editNote(index)}
                                  style={{ marginLeft: "10px" }}
                                  fullWidth
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => deleteNote(index)}
                                  style={{ marginLeft: "10px" }}
                                  fullWidth
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
