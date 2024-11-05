/**
 * Title: Resaturants Display
 * Author: Sri Ramya Basam
 * Date: 2022/11/20
 * Availability: https://mui.com/material-ui/getting-started/overview/
 */
import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router";

export class OrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      food: [],      
      
    };
  }
  //Fetches food from dynamodb
  async componentDidMount() {
    await axios
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
        console.log("response",response.data);
        // console.log("response body",response.data.body);      
        response = JSON.parse(response);
        console.log("response1 ",response)        
      });     
      
  } 

  render() {
    return (
      <h3>Order Your Food</h3>      
    );
  }
}

export default OrderFood;
