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
const theme = createTheme({
	palette: {
		background: {
			default: "#e0f8fe",
		},
	},
});
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
export default function Album() {
    const configuration = {
        region: "us-east-1",
        secretAccessKey: "zyUFeAKCvNJ5Qe4EfFY5V/7ecY8Uf9fVPMOWDojr",
        accessKeyId: "AKIA2O7OWW2KNTGTTLGN",
        
      };
      AWS.config.update(configuration);
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState([]);
    const docClient = new AWS.DynamoDB.DocumentClient();
	useEffect(() => {
        const params = {
            TableName : "Recipes"
        }
        docClient.scan(params, function (err, data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
                setRecipes(data.Items)
            }
        })
	}, []);
	function generateSimilarity () {
		axios({
			method: 'post',
			url: 'https://automl.googleapis.com/v1/projects/673964779431/locations/us-central1/models/TCN5300887394508079104:predict',
			headers: {
				Authorization:
				  	'Bearer ya29.a0AeTM1ieVYL22KUQirScwwXdKOlnIA89au0juPgDDP8fEGIjrWsVxcwNZidGsBvxvjnrwNO3qFfNOgWF1iZBQ7FfvIF7wIZDaabV3JvZIyf7NvlwcsxPe-euJFLnxbrXJgxCbKUkc4i1EHwmM4UuKVooWE0rrRkFas1OtN2mMkDyoNwPNn8quwmge6LTJ6xMnp97HNJe2tDjRn-6Vttlpjq-iRG21DMjp3BTdbMvQKr0XKQ-8reM2KyVnHmM-L8brolST20saCgYKAfYSAQ4SFQHWtWOmLcDnRjvNHlCYwiZ1KG8j0g0270',
					'Content-Type': 'application/json',
			},
			contentType: 'application/json',
			body: JSON.stringify({
				"payload": {
				  "document": {
					"input_config": {
					  "gcs_source": {
						"input_uris": "similarityscore/DummyRecipeUpload.pdf"
					  }
					}
				  }
				}
			})
		});  
	}
	function recipeVisual (){
		navigate("/recipeVisual")
	}
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<div className={"tourPackages"}>
					<h1
						style={{
							color: " #c9d0d4",
							fontFamily: "Helvetica Neue",
							fontSize: "46px",
						}}
					>
						“Easy to make recipes that make eating feel like a celebration”
					</h1>
				</div>
				<div>
				{/* <Button variant="text" onClick={generateSimilarity}>View Similarity in Recipes</Button> */}
				<Button variant="text" onClick={recipeVisual}>View Recipe Visualization</Button> 	
				</div>
				<Container sx={{ py: 8 }} maxWidth="md">
					<Grid container spacing={4}>
						{recipes.map((card) => (
							<Grid item key={card.recipeURL} container spacing={5} sx={{ mt: 1 }}>
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
												{card.Title}
											</Typography>
                                            Ingredients: 
											<Typography paragraph sx={{ mt: 5 }}>
												{card.Ingredients}
											</Typography>
                                            Recipe: 
											<Typography paragraph sx={{ mt: 5 }}>
												{card.Recipe}
											</Typography>
										</CardContent>
									</Box>
									<CardMedia
										component="img"
										sx={{ width: 200 }}
										image="https://images.unsplash.com/photo-1523568129082-a8d6c095638e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=788&q=80"
										alt="Live from space album cover"
									/>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</ThemeProvider>
	);
}
