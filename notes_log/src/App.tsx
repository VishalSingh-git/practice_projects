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

interface Note {
  id: number;
  content: string;
}

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

const App= () => {
  const classes = useStyles();
  const [noteInput, setNoteInput] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showFullNotes, setShowFullNotes] = useState<boolean>(false);

  useEffect(() => {
    // Load notes from local storage on component mount
    const storedNotes: Note[] = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = () => {
    if (noteInput.trim() !== "") {
      if (editingIndex !== null) {
        // If editing, update the existing note
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = { id: editingIndex, content: noteInput };
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        // If not editing, add a new note
        const newNote: Note = { id: notes.length, content: noteInput };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
      }

      localStorage.setItem("notes", JSON.stringify(notes));
      setNoteInput("");
    }
  };

  const editNote = (index: number) => {
    setNoteInput(notes[index].content);
    setEditingIndex(index);
  };

  const deleteNote = (index: number) => {
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
      <Grid container spacing={1}>
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
                    key={note.id}
                    onClick={() => editNote(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {`${note.content.substring(0, 15)}...`}
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
                maxRows={4}
              />

              {showFullNotes && (
                <div>
                  <Typography variant="h6">All Previous Notes</Typography>
                  <Grid container spacing={2}>
                    {notes.map((note, index) => (
                      <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className={classes.display_notes}>
                          <CardContent>
                            <div>
                              {note.content}
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
