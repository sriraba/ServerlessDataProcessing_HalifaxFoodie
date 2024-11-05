/**
 * Title: Navigation Bar
 * Author: Sri Ramya Basam
 * Date: 2022/11/20
 * Availability: https://mui.com/material-ui/getting-started/overview/, https://levelup.gitconnected.com/how-to-create-a-navigation-bar-with-material-ui-9cbcfcec2570
 */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    centerTitle: false
  },
}));

// code to create navigation bar
const Navbar = () => {
  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    setOpen(true);
    localStorage.clear();
    navigate('/');    
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex" }}>        
        <Typography variant="h9" component="div" onClick={handleHome}>
          Halifax Foodie
        </Typography>
        <Button color="inherit" align="right"  style={{ marginLeft: "auto" }}  onClick={handleSignout}>
          Signout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;