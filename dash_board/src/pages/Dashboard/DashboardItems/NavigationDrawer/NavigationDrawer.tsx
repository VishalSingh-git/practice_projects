import {
  Box,
  Collapse,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { AppBar, Badge, Button, FormControl, List, ListItemButton, MenuItem, Select, Stack, TextField, Toolbar } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";


import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import SearchIcon from "@mui/icons-material/Search";

import NavigationData from "./NavigationData.json";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 250;
const useStyles = makeStyles({
  MainDrawer: {
    display: "flex",
    flexDirection: "column",
    width: drawerWidth,
    // backgroundColor: "black",
    color:"white"
    // height: "100vh",
  },
  DrawerHeader: {
    // backgroundColor: "black",
    color: "white",
    height: "10vh",

    display: "flex",
    flexDirection: "row",

    justifyContent: "space-around",
    padding: 1,
    alignItems: "center",
  },
  Logo: {
    maxHeight: "30%",
    width: "auto",
  },
  ListItem: {
    display: "flex",
    flexDirection: "column",
  },
  Notification:{
    display: "flex",
    alignItems: "center",
    gap:10
  }
  ,
  AppBar: {
    color: "balck",
    backgroundColor: "white", // Set your desired background color]

  },
  ToolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SearchBar: {
    // display: "flex",
    // flexDirection: "row",
    alignItems: "center",
  },
  drawerPaper:{
    width:drawerWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',


    // scrollbarHeight:"shorthand",
    scrollbarWidth:"thin",
    "&::-webkit-scrollbar":{
      width:"6px",


    },
    "&::-webkit-scrollbar-thumb":{
      borderRadius:"3px",
      backgroundColor: '#2196F3',
      height:"20px",
    }
  }
  ,

DrawerToolbar:{
  // backgroundColor: 'rgba(0, 0, 0, 0.9)'
}
});
const NavigationDrawer = () => {
  const classes = useStyles();

const navigate=useNavigate()

  const [isOpen, setIsOpen] = useState(true);

  const [openMenuItems, setOpenMenuItems] = useState<{
    [key: number]: boolean;
  }>({});

  const handleListItemClick = (index: number) => {
    setOpenMenuItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const handleDrawerOpen = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(NavigationData);
  return (
  <Box>
            <AppBar
          position="static"
          sx={{
            backgroundColor: "gray",
            color: "black",
            border: "1px solid black",
            display: "flex",
            // flexGrow:1,
          }}
          className={classes.AppBar}
        >
          <Toolbar sx={{ ml: 5 }} className={classes.ToolBar}>
            <Stack direction={"row"} gap={3} className={classes.SearchBar}>
              <MenuIcon   onClick={handleDrawerOpen} />
              <Typography variant="h6">Buttons</Typography>
              <TextField
                variant="outlined"
                label="Search"
                size="small"
                InputProps={{
                  startAdornment: (
                    <SearchIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                  ),
                }}
                placeholder=" search here"
              />
            </Stack>
            <Box   className={classes.Notification} sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              {" "}
              <Badge badgeContent={4} color="primary">
                <NotificationsOutlinedIcon />
              </Badge>
              <FormControl>
                <Select label="Contact">
                  <MenuItem value={10}>Message</MenuItem>
                  <MenuItem value={20}>Help Center</MenuItem>
                  <MenuItem value={30}>Setting</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
      <Drawer className={classes.MainDrawer} classes={{paper:classes.drawerPaper}} variant="persistent" open={isOpen}>

      <Box className={classes.DrawerToolbar}   sx={{color:"white"}}   >
      <Box className={classes.DrawerHeader}>

<img
  className={classes.Logo}
  src="https://cdn.iconscout.com/icon/free/png-512/free-react-1-282599.png?f=webp&w=256"
  alt="Sample Image"
/>
<Typography variant="h6">CREATIVE TIM</Typography>
</Box>
<Divider  />
<List
sx={{ width: "100%"  ,color:"white" }}
component="nav"
>
{NavigationData.map((item: any, index) => {
  return (
    <ListItem key={index} className={classes.ListItem}>
       { console.log(item.subMenu)}
      <ListItemButton onClick={() =>{ handleListItemClick(index); navigate("/")}}>
        <ListItemIcon>
          {item.icon === "profile" && <AccountCircleIcon  sx={{color:"white"}} />}
          {item.icon === "dashboard" && <InstagramIcon sx={{color:"white"}} />}
          {item.icon === "component" && <ViewInArOutlinedIcon sx={{color:"white"}} />}
          {item.icon === "forms" && <FormatAlignJustifyOutlinedIcon  sx={{color:"white"}}/>}
          {item.icon === "table" && <TableViewOutlinedIcon sx={{color:"white"}} />}
          {item.icon === "maps" && <RoomOutlinedIcon sx={{color:"white"}} />}
        </ListItemIcon>
        <ListItemText primary={item.name} />

        {item.subMenu && openMenuItems[index] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {item.subMenu && (
        <Collapse
          in={openMenuItems[index]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {item?.subMenu?.map((subMenuItem: any, subIndex: any) => {
              return (
                <ListItem key={subIndex} component={Link} style={{textDecoration:"none",color:"white"}}  to={subMenuItem.path}>
                  <ListItemButton>
                    <ListItemText
                      primary={subMenuItem.name}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
})}
</List>
      </Box>

    </Drawer>
  </Box>
  );
};

export default NavigationDrawer;
