/**
 * Title: Show Ciphertext To customer
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://mui.com/material-ui/getting-started/overview/, 
 */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid,Paper, TextField, Button} from '@material-ui/core'
import { Select, MenuItem, InputLabel } from '@material-ui/core';

// code to show cipher text generated to user
const ShowCipher=()=>{
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
      return(
                <Grid>
                     <Paper elevation={20} style={paperStyle}>
                     <InputLabel>Save your code : {localStorage.getItem("ciphertext")}</InputLabel>
                     <NavLink className="navbar-item" activeClassName="is-active" to="/login">
                    Sign in
                    </NavLink>
                     </Paper>
                </Grid>
              );
}

export default ShowCipher;