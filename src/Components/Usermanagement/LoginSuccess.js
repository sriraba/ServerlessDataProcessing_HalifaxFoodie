/**
 * Title: Home Page After User Login
 * Author: Sri Ramya Basam
 * Date: 2022/11/10
 * Availability: https://mui.com/material-ui/getting-started/overview/, https://codesandbox.io/s/50l225l964?file=/src/index.js:608-1288
 */
import React, { useState } from 'react';
import { Grid,InputLabel } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Navbar from "../navbar";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// code for home page after user logs in 
const LoginSuccess = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOrders = () => {
    setOpen(true);
    localStorage.clear();
    axios
      .post(
        "https://2cp6obqsaa5olxkim3fuuwufna0fiapw.lambda-url.us-east-1.on.aws/",

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      ).then((response) => { 
        var response1 = JSON.stringify(response)         
        response = JSON.parse(response1);
        localStorage.setItem("restaurants",response.data)    
        console.log("response local storage  ",localStorage.getItem("restaurants"))               
      });      
    navigate('/orderfood');    
  };

  // code to show different content on home page based on usertype (owener, customer)
  return (
    <div className="App">
      <Grid>
      <Navbar></Navbar>
      </Grid> 
      {
        localStorage.getItem("usertype") === "customer" && 
        <Card  style = {{width:200, height: 150, marginLeft: 200, marginTop:200}} onClick={handleOrders}>
        <CardContent>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            Restaurants
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}          >
            You can browse the restaurants here.
          </Typography>         
        </CardContent>
      </Card>
      }    
  
            
    </div>    
  );
};

export default LoginSuccess;
