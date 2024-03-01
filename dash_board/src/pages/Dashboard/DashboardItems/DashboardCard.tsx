import { Box, Divider, makeStyles } from '@material-ui/core'
import { Button, Card, CardActions, CardContent, Grid, Icon, Typography } from '@mui/material'
import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const CardItems=[{
  "name":"Number",
  "data":"150GB",
  "action":"Update Now"
},
{
  "name":"Revenue",
  "data":"$ 1,345",
  "action":"Last day"
},{
  "name":"Errors",
  "data":"23",
  "action":"In the last hour"
},{
  "name":"Followers",
  "data":"+45K",
  "action":"Update Now"
}]

const useStyles=makeStyles({
CardContent:{
 display: "flex",
 justifyContent: "space-around",
 alignItems: "center",


}
})
const DashboardCard = () => {
  const classes=useStyles()
  return (
  <Grid item   >
    {CardItems.map((item, index) => (
      <Card key={index} sx={{ minWidth: 275, m :4,display:"inline-block"}}>
        <CardContent  className={classes.CardContent}>
          <Icon>{item.name=="Number"&&<AddCircleOutlineOutlinedIcon     sx={{color:"orange"}}/>}

          {item.name=="Revenue"&&<WbSunnyOutlinedIcon      sx={{color:"green"}}   />}
          {item.name=="Errors"&&<GamesOutlinedIcon     sx={{color:"red"}}/>}
          {item.name=="Followers"&&<FavoriteBorderOutlinedIcon    sx={{color:"blue"}}/>}

          </Icon>
          <Typography variant="h6"  color="textSecondary">
            {item.name}
          </Typography>
          <Typography variant="body1" >
            {item.data}
          </Typography>
        </CardContent>
        <Divider/>
        <CardActions>
          <Button size="small"   sx={{ color: "textSecondary !important " }}>{item.action}</Button>
        </CardActions>
      </Card>
    ))}
</Grid>
  )
}

export default DashboardCard
