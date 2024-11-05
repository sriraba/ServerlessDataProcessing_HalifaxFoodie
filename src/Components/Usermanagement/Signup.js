/**
 * Title: User Registration Page 
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://mui.com/material-ui/getting-started/overview/, 
 */
import React, { useState } from "react";
import UserPool from "../../UserPool";
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import KommunicateBot from "../Onlinesupport/chat";


const Signup = () => {
    const navigate = useNavigate();
    localStorage.clear();

    const paperStyling = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const margin = { marginTop: 5}
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [plaintext, setPlaintext] = useState("");
    const [key, setKey] = useState("");
    const [selectedquestion, setSelectedquestion] = useState('');
    const [usertype, setUsertype] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    

    const onSubmit = (event) => {
        event.preventDefault();        
        UserPool.signUp(username, password, [], null, (err, data) => {
            if(err) {
                console.error(err);
            }
            console.log(data);
            // code to save user details in cognito pool
            // old url  const api = 'https://ppuwwrywy3y3n7ren2bbvwnjjy0vfyvr.lambda-url.us-east-1.on.aws/';
            const api = 'https://dgmlm2w4gilnbxpqbiezlo2stq0wlrzk.lambda-url.us-east-1.on.aws/';
            const userinfo = { "username" : username, "password" : password, "usertype":usertype,"email":email };
            axios.post(api, {
                headers: {
                    'Access-Control-Allow-Headers':'*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Request-Method': 'POST'
                },
                body:userinfo,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            }); 
            // code to save second factor details to firebase
            // old cloud proxy const api1 = "https://nyai3vepzmh2m7okwmtii7jesa0wkxnq.lambda-url.us-east-1.on.aws/"
            const api1 = "https://fefg2q3efvrumhfj67vqt5q6au0oyahl.lambda-url.us-east-1.on.aws/"            
            const api2 = "https://us-central1-csci5410-sriramya.cloudfunctions.net/userSecondAuth"
            const secondFactor = {"username": username,"question":selectedquestion,"answer": answer} 
                axios.post(api1, {
                
                body:secondFactor,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            }); 

            //send cipher to dynamo
            // old url const  lambdaCipherUrl= "https://ymxcn2dhuvdac2bv4rup2jxq5e0zxcot.lambda-url.us-east-1.on.aws/"
            const lambdaCipherUrl= "https://mslcpal5agnxzf3grmtydsswuq0xoygy.lambda-url.us-east-1.on.aws/"            
            const cipher = {"username": username,"plaintext":plaintext,"key": key}
            
            axios.post(lambdaCipherUrl,                 
                cipher,
            )
            .then((response) => {
              console.log(response);
              setCiphertext(response.data);
              localStorage.setItem("ciphertext",response.data)
              navigate('/showcipher');
            })
            .catch((error) => {
              console.log(error);
            });             
            
        });
        
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyling}>
                <Grid align='center'>
                    <Typography variant='caption' gutterBottom>You can avail services by creating account !</Typography>
                </Grid>
                <form onSubmit={onSubmit} align="left">
                    <TextField fullWidth label='Name' placeholder="Enter your name" required value={username} onChange={(event) => setUsername(event.target.value)}/>                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" type='password' required value={password} onChange={(event) => setPassword(event.target.value)}/><br></br><br></br>
                    
                    <FormControl component="fieldset" style={margin} align="left">
                        <FormLabel component="legend">User Type</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype" style={{ display: 'initial' }} value={usertype} onChange={(event) => setUsertype(event.target.value)}>
                            <FormControlLabel value="owner" control={<Radio />} label="Owner" />
                            <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                        </RadioGroup>
                    </FormControl>   
                    <TextField fullWidth label='Email' placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)}/><br></br><br></br>
                    <FormControl fullWidth component="fieldset" style={margin} align="left"> 
                    <FormLabel fullWidth component="legend">Select security question below</FormLabel>            
                    <Select fullWidth value={selectedquestion} onChange={(event) => setSelectedquestion(event.target.value)}>
                    
                        <MenuItem value="What is your nickname">What's your nickname?</MenuItem>
                        <MenuItem value="What's the name of your first pet?">What's the name of your first pet?</MenuItem>
                        <MenuItem value="What's your birthplace?">What's your birthplace?</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField fullWidth label='Security Answer' placeholder="Enter answer" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
                    <TextField fullWidth label='Plain text' placeholder="Enter a plain text" value={plaintext} onChange={(event) => setPlaintext(event.target.value)}/>
                    <TextField fullWidth label='Key' placeholder="Enter a four letter word" value={key} onChange={(event) => setKey(event.target.value)}/><br></br><br></br>
                    <Button type='submit' variant='contained' color='primary' fullWidth>Sign up</Button>
                </form>
                <div><KommunicateBot></KommunicateBot></div>
            </Paper>
        </Grid>
    );

};

export default Signup;