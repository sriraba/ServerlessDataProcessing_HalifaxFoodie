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
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { parse } from "json2csv";
import Grid from "@mui/material/Grid";
import AWS from "aws-sdk";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



const theme = createTheme({
  palette: {
    background: {
      default: "#e0f8fe",
    },
  },
});
 
export default function Album() {
  let navigate = useNavigate();
  const docClient = new AWS.DynamoDB.DocumentClient();
  const configuration = {
    region: "us-east-1",
    secretAccessKey: "zyUFeAKCvNJ5Qe4EfFY5V/7ecY8Uf9fVPMOWDojr",
    accessKeyId: "AKIA2O7OWW2KNTGTTLGN",
  };
  AWS.config.update(configuration);
  // const firebaseConfig1 = {
  //   apiKey: "AIzaSyBvMn0rMngZG8ojY6Aco1bRch_4IKVjG1Y",
  //   authDomain: "csci-5410-visualization.firebaseapp.com",
  //   projectId: "csci-5410-visualization",
  //   storageBucket: "csci-5410-visualization.appspot.com",
  //   messagingSenderId: "1079881918417",
  //   appId: "1:1079881918417:web:29dbd99491b16a9661a2f0",
  //   measurementId: "G-BNF6ZL74HC",
  // };
  // const app1 = initializeApp(firebaseConfig1);
  // const storage1 = getStorage(app1);
  // const storageRef = ref(storage1, "visualization.csv");
  
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const params = {
      TableName: "Recipes",
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        setRecipe(data.Items);
        const csv = parse(data.Items);
        // uploadString(storageRef, csv).then((snapshot) => {
        //   console.log("Uploaded a raw string!");
       // });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
          <Typography component="div" variant="h5" sx={{marginBottom:10}}>
												Recipe Visualization
					</Typography>
          <Grid container spacing={4}>
            <iframe
              width="600"
              height="450"
              src="https://datastudio.google.com/embed/reporting/52d660bb-381e-48ed-9837-892affcf2abd/page/4RU9C"
            ></iframe>
            
            </Grid>
          </Grid>
        </Container>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
              onClick = {() => navigate("/uploadFeedback")}
            >
            
            </Button>
      </main>
    </ThemeProvider>
  );
}
