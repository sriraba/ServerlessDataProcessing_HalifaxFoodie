/**

 * Title: Display Message  

 * @author - Aishwarya Natarajan

 * Availability:  https://www.youtube.com/watch?v=gm-bggVJb5k

 *                https://www.geeksforgeeks.org/how-to-create-an-unique-id-in-reactjs/

 *                https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html

 *                https://stackoverflow.com/questions/67761397/how-to-clear-array-from-usestate

 *                https://www.freecodecamp.org/news/pass-data-between-components-in-react/#:~:text=First%2C%20you'll%20need%20to,one%20parent%20and%20one%20child.&text=Next%2C%20you'll%20import%20the,parent%20component%20and%20return%20it.&text=Then%20you'll%20create%20a,Hook%20to%20manage%20the%20data

 *                https://stackoverflow.com/questions/57139203/one-or-more-parameter-values-were-invalid-type-mismatch-for-key-xyz-expected-s

 *                https://stackoverflow.com/questions/44972594/inline-if-else-with-conditional-operator-not-working-react

 *                https://www.folkstalk.com/tech/float-right-in-react-js-with-code-examples/#:~:text=How%20do%20you%20float%20right%20in%20react%3F&text=Use%20textAlign%3A%20'right'%20on,%2Dend'%20on%20the%20View.

 */
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AWS from "aws-sdk";
import axios from "axios"
import { parse } from "json2csv";

import { CSVLink } from "react-csv";



import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";

const theme = createTheme({
  palette: {
    background: {
      default: "#e0f8fe",
    },
  },
});

export default function Polarity() {
  
    // const firebaseConfig2 = {
    //     apiKey: "AIzaSyDCNwYSnMU1cQMIZnjzoX1t0RsBLPaQD9w",
    //     authDomain: "csci5410-ml-module.firebaseapp.com",   
    //     projectId: "csci5410-ml-module",
    //     storageBucket: "csci5410-ml-module.appspot.com",
    //     messagingSenderId: "673964779431",
    //     appId: "1:673964779431:web:16acfddbd0a42bcfea3882"
    //   };
    
    //   const app2 = initializeApp(firebaseConfig2);
    //   const storage2 = getStorage(app2);
    //   const storageRef = ref(storage2, 'polarity.csv');
      
  const docClient = new AWS.DynamoDB.DocumentClient();
  const [data, setData] = useState([]);
  const configuration = {
    region: "us-east-1",
    secretAccessKey: "zyUFeAKCvNJ5Qe4EfFY5V/7ecY8Uf9fVPMOWDojr",
    accessKeyId: "AKIA2O7OWW2KNTGTTLGN",
  };
  AWS.config.update(configuration);
  useEffect(() => {
    const params = {
      TableName: "Polarity",
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setData(data.Items);
        const csv = parse(data.Items);
        // uploadString(storageRef, csv).then((snapshot) => {
        //     console.log('Uploaded a raw string!');
        //   });
      }
    });
  }, []);
  function handleClick() {
    axios.post('https://xouw5j57jsmqu2yzina7heynea0crpug.lambda-url.us-east-1.on.aws/')
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CSVLink data={data} onClick = {handleClick()} >
            Generate Graph
          </CSVLink>
          <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/77a53147-1246-4143-92fd-efc66cb8e92f/page/sMU9C" allowfullscreen></iframe>
        </Box>
      </Container>
      
    </ThemeProvider>
  );
}
