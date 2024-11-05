import React, { useState , useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
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

export default function UploadFeedback() {
  let navigate = useNavigate();
  const configuration = {
    region: "us-east-1",
    secretAccessKey: "zyUFeAKCvNJ5Qe4EfFY5V/7ecY8Uf9fVPMOWDojr",
    accessKeyId: "AKIA2O7OWW2KNTGTTLGN",
    
  };
  AWS.config.update(configuration);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [id , setID] = useState("")
  const [feedbacks,setFeedbacks]= useState([])
  const docClient = new AWS.DynamoDB.DocumentClient();
  useEffect(() => {
    const params = {
        TableName : "UserFeedback"
    }
    docClient.scan(params, function (err, data){
        if(err){
            console.log(err)    
        }else{
            console.log(data)
            setFeedbacks(data.Items)
        }
    })
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setName(data.get("name"));
    setFeedback(data.get("feedback"));
    let fid = Math.floor((Math.random() * 100000000000000) + 1)
    setID(fid .toString())
    console.log(id + " " + feedback + " " + name)

    const docClient = new AWS.DynamoDB.DocumentClient();
    var paramsdb = {
        TableName: "UserFeedback",
        Item : {
          Name : name,
          Feedback : feedback,
          FeedbackID : id
        }
      }
      await docClient.put(paramsdb , function(err, data){
        if(err){
         console.log(err)
        }else{
            console.log("updated")
            window.location.reload();
           
        }
      })
  };
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
          <Typography component="h1" variant="h5">
            Please Provide your Feedback
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
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="feedback"
              label="Feedback"
              name="feedback"
              rows={8}
              multiline
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick = {() => navigate("/polarity")}
        >
            View Feedback Polarity  
        </Button>
          </Box>
        </Box>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">

      <Grid container spacing={4}>
      
						{feedbacks.map((card) => (
							<Grid item key={card.FeedbackID} container spacing={5} sx={{ mt: 1 }}>
								<Card
									sx={{
										display: "flex",
										width: 1000,
										maxHeight: 320,
										color: "#00838f",
                                        overflow: 'auto'
									}}
								>
									<Box sx={{ display: "flex", flexDirection: "column" }}>
										<CardContent sx={{ flex: "1 0 auto"}}>
                                        <Typography component="div" variant="h5" >
												User Feedback:
											</Typography>
											<Typography component="div" >
												{card.Feedback}
											</Typography>
										</CardContent>
									</Box>
								</Card>
							</Grid>
						))}
					</Grid>
                    </Container>
                    
    </ThemeProvider>
  );
}
