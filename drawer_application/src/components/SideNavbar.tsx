




import React, { useState } from 'react';
import {
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Box,
  Typography,

} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Account from '../pages/Account/Account';
import User from '../pages/Users/User';
import NavigationData from '../NavigatinData.json';
import { makeStyles } from '@material-ui/core';
const drawerWidth = 240;

const useStyles = makeStyles( {

    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      width: drawerWidth,

    },
    drawerPaper: {
      width: drawerWidth,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,

    },
    appBarShift: {
      marginLeft: 0,
      width: '100%',

    },
    menuButton: {
      // marginRight: 36,
    },
    hide: {
      // display: 'none',
    },

})

const SideNavbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState('');
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuItem = (value: any) => {
    setMenuData(value);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenu = (itemName: string) => {
    setSubmenuOpen( itemName);
  };

  return (
    <>
     <MuiAppBar
          position="fixed"
          className={open ? classes.appBarShift : classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              className={open ? classes.hide : classes.menuButton}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
             Drwaer  user details  Drwaer  user details
            </Typography>
          </Toolbar>
        </MuiAppBar>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}

        <MuiDrawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: open ? classes.drawerPaper : classes.hide,
          }}

          sx={{
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
          }}

       >
          <Toolbar />
          <List>
            {NavigationData?.map((item) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{}}
                onClick={() => handleMenuItem(item.name)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon === 'home' && <HomeOutlinedIcon />}
                    {item.icon === 'users' && <PersonOutlineOutlinedIcon />}
                    {item.icon === 'account' && (
                      <AccountCircleOutlinedIcon />
                    )}
                    {item.icon === 'profile' && (
                      <AssignmentIndOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item.subMenu && (
                    <>
                      {submenuOpen === item.name ? (
                        <ExpandLessIcon
                          onClick={() => handleSubMenu(item.name)}
                        />
                      ) : (
                        <ExpandMoreIcon
                          onClick={() => handleSubMenu(item.name)}
                        />
                      )}
                      <Collapse
                        in={submenuOpen === item.name}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item?.subMenu.map((subMenuItem) => (
                            <ListItem
                              key={subMenuItem.name}
                              disablePadding
                              sx={{ pl: 4 }}
                              onClick={() =>
                                handleMenuItem(subMenuItem.name)
                              }
                            >
                              <ListItemButton>
                                <ListItemText primary={subMenuItem.name} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </MuiDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 ,ml:40}}>

          {menuData === 'Home' && <Home />}
          {menuData === 'Profile' && <Profile />}
          {menuData === 'Account' && <Account />}
          {menuData === 'Users' && <User />}

          {submenuOpen}
        </Box>
      </Box>
    </>
  );
};

export default SideNavbar;
