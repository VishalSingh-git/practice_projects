import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";

const NotesList=(props)=>{

let data=props.notesList
    // console.log(props.notesList)

return (

    <Grid container spacing={2}>
    {data.map((item, index) => (
      <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
        {/* Adjust the breakpoints (xs, sm, md, lg) and card size based on your design */}
        <Card>
          <CardContent>
            <Typography variant="h5">{item}</Typography>

            {/* Add more content or components here */}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)

}
export default NotesList


