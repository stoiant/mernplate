import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import BookIcon from '@material-ui/icons/Book';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const drawerWidth = 240;
const drawerHeight = 67;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingBottom: drawerHeight,
    color: '#e0e0e0',
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    color: 'inherit',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}),
{
  withTheme: true
});

export default function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleStatus = () => {
    setStatus(!status);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Mern Boiler Plate
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"Home"} component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Home"} onClick={handleDrawerClose} />
          </ListItem>
          <ListItem button key={"Read Me"} component={Link} to="/readme">
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={"Read Me"} onClick={handleDrawerClose} />
          </ListItem>
        </List>
        <Divider />
        <ListItem button key={"Logs"} component={Link} to="/logs">
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary={"Logs"} onClick={handleDrawerClose}/>
        </ListItem>
        <ListItem button key={"Status"} onClick={handleStatus}>
          <ListItemIcon><SystemUpdateAltIcon /></ListItemIcon>
          <ListItemText primary={"Status"} />
          {status ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={status} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button
                className={classes.nested}
                onClick={handleDrawerClose}
                component={Link} to="/expressStatus">
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Express" />
            </ListItem>
            <ListItem button
                className={classes.nested}
                onClick={handleDrawerClose}
                component={Link} to="/nodeStatus">
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Node" />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
    </div>
  );
}
