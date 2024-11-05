import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AWS from "aws-sdk";
import axios from "axios";

// https://codesandbox.io/s/50l225l964?file=/src/index.js:608-1288

const theme = createTheme({
  palette: {
    background: {
      default: "#e0f8fe",
    },
  },
});

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
      )
      .then((response) => {
        var response1 = JSON.stringify(response);
        response = JSON.parse(response1);
        localStorage.setItem("restaurants", response.data);
        console.log(
          "response local storage  ",
          localStorage.getItem("restaurants")
        );
      });
    navigate("/orderfood");
  };

  function navRecipe(){
    navigate("/recipes")
  }
  function navRecipeUpload(){
    navigate("/uploadRecipe")
  }
  function navFeedbackUpload(){
    navigate("/uploadFeedback")
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
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
        <Container sx={{ py: 8 }} maxWidth="md">
          <Card sx={{ display: "flex" , width: 600}} onClick={navRecipe}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                <Typography component="div" variant="h5" sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                  Recipe Lists
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Card sx={{ display: "flex" , width: 600, mt : 10}} onClick={navRecipeUpload}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                <Typography component="div" variant="h5" sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                  Upload Recipes
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Card sx={{ display: "flex" , width: 600 , mt : 10}}>
            <Box sx={{ display: "flex", flexDirection: "column" }} onClick={navFeedbackUpload}>
              <CardContent sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                <Typography component="div" variant="h5" sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                  Upload Feedback
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Card sx={{ display: "flex" , width: 600 , mt : 10}} onClick={()=>navigate("/polarity")}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                <Typography component="div" variant="h5" sx={{ flex: "1 0 auto" , alignItems: 'center', pl: 1, pb: 1}}>
                  User Feedback Polarity Visualization
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default LoginSuccess;
