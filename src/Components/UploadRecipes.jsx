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
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import AWS from "aws-sdk";


const theme = createTheme({
  palette: {
    background: {
      default: "#e0f8fe",
    },
  },
});
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function BasicCard() {
  let navigate = useNavigate();
  const configuration = {
    region: "us-east-1",
    secretAccessKey: "zyUFeAKCvNJ5Qe4EfFY5V/7ecY8Uf9fVPMOWDojr",
    accessKeyId: "AKIA2O7OWW2KNTGTTLGN",
    
  };
  AWS.config.update(configuration);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    setTitle(data.get("title"));
    setIngredients(data.get("ingredients"));
    setRecipe(data.get("recipe"));
    const uploadingData = "Ingredients: "+"\n"+ ingredients + "\n" + "Recipe:" + "\n" + recipe;
    //uploading to s3
    const s3 = new AWS.S3();
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
      Bucket: "uploadrecipes",
      Key: title + ".txt",
      Body: uploadingData,
      ContentType: "application/json",
    };
      var paramsdb = {
        TableName: "Recipes",
        Item : {
          Title : title,
          Ingredients : ingredients,
          Recipe : recipe
        }
      }
      docClient.put(paramsdb , function(err, data){
        if(err){
         console.log(err)
        }else{
          s3.putObject(params)
          .promise()
          .then((res) => {
            console.log(`Upload succeeded - `, res);
            navigate("/recipes");
            
          })
          .catch((err) => {
            console.log("Upload failed:", err);
          });
        }
      })
      
      
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Upload Recipes
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Recipe Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ingredients"
              rows={4}
              label="Ingredients"
              name="ingredients"
              multiline
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="recipe"
              label="Recipe"
              name="recipe"
              rows={8}
              multiline
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {() => navigate("/recipes")}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
