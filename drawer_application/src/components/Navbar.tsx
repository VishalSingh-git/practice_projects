import * as React from "react";
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// import {
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   ExpandLess as ExpandLessIcon,
//   ExpandMore as ExpandMoreIcon,
// } from '@mui/icons-material';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import NavigationData from "../NavigatinData.json";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

interface DrawerProps {
  open?: boolean;
}
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles({

  ListMain:{width:"100%"},
  mainListItem: {
    display: "flex",
    flexWrap: "wrap",
  },
  subListItem: {
    paddingLeft: 100,
    alignItems: "center",
    display: "block",
  },
  outletBody: {
    flexGrow: 1,
    padding: 30,
    marginTop:40,
    backgroundColor: "transparent",
    height:"95vh",
  },
});

interface SubMenuItem {
  name: string;
  path: string;
}

interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
  subMenu?: SubMenuItem[];
}
export default function Navbar() {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [isSubMenuOpen,setIsSubMenuOpen]=useState<boolean>(false);
  const [menuItem, setMenuItem] = useState<string>("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {

    setOpen(false);
  };

  const handleMenuItem = (value: string) => {
    if (isSubMenuOpen && menuItem === value) {
      // setIsSubMenuOpen(false);
      // setMenuItem("");
    } else {
      setMenuItem(value);
      setIsSubMenuOpen(true);
    }
  };




  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography pl={2}>Drawer Items</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List   className={classes.ListMain}>
          {NavigationData?.map((item:NavigationItem , index:number) => (

              <ListItem
              key={index}
                disablePadding
                className={classes.mainListItem}
                component={Link}
                to={item.path}
                onClick={()=>{handleMenuItem(item.name)}}

              >
                <ListItemButton
               onClick={() =>setIsSubMenuOpen(false)}
                selected={item.name===menuItem}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon === "home" && <HomeOutlinedIcon />}
                    {item.icon === "users" && <PersonOutlineOutlinedIcon />}
                    {item.icon === "account" && <AccountCircleOutlinedIcon />}
                    {item.icon === "profile" && <AssignmentIndOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />

                  {item?.subMenu && open ? (
                    menuItem === item.name ? (
                      <ExpandLessIcon


                      />
                    ) : (
                      <ExpandMoreIcon

                      />
                    )
                  ) : null}
                </ListItemButton>

              {item?.subMenu && isSubMenuOpen &&(
                <>
                  <Collapse
                    in={menuItem === item.name}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item?.subMenu.map((subMenuItem: any, index: number) => (
                        <ListItem
                          key={index}
                          disablePadding
                          className={classes.subListItem}
                          component={Link}
                          to={subMenuItem.path}

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
             </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" className={classes.outletBody}>
        <Outlet />
      </Box>
    </Box>
  );
}
