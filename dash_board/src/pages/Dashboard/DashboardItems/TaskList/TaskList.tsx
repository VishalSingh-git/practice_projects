import { Box, Card, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import TaskListItems  from "./TaskListItems.json"
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { Divider } from '@material-ui/core';
const TaskList = () => {
let TaskList :any=TaskListItems


  return (
<Box  sx={{p:3 ,border: "1px solid #e0e0e0" }}>
      <FormControl component="fieldset">
        <Typography variant="h6">Tasks</Typography>
        <Typography variant="body1" color="textSecondary" >Backend development</Typography>
        <FormGroup row>
          <Grid container spacing={2} direction={'column'}>
            {TaskList.tasks.map((option: any, index: any) => (
              <Grid item  key={index}   sx={{display:"flex",flexWrap:"nowrap" ,alignItems:"center" }} >
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={option.task}
                />
                <EditNoteOutlinedIcon sx={{color:"aqua"}}/>
<CancelPresentationOutlinedIcon sx={{color:"red"}}  />
              </Grid>
            ))}
<Divider/>
<Typography variant='body1'color="textSecondary">Updated 3 minutes ago</Typography>

          </Grid>
        </FormGroup>

      </FormControl>


    </Box>
  )
}

export default TaskList
