import {   List,
  ListItem,
  ListItemText,
 } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TodoList=()=>{
    return(
       <> <Link to={"/"}>GO BACK</Link>
        <div>
        <h2>Task List</h2>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${task.task} - ${task.status}`} />
            </ListItem>
          ))}
        </List>
      </div></>
    )
}

export default TodoList
