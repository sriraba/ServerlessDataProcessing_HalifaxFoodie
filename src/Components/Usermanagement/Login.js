/**
 * Title: User Login Page 
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://mui.com/material-ui/getting-started/overview/
 */
import React, { useState } from "react";
import { Grid,Paper, TextField, Button} from '@material-ui/core'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import UserPool from "../../UserPool";
import FormControl from '@material-ui/core/FormControl';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import { Alert } from 'react-alert'
import axios from 'axios';

// code to connect to cognito and validate user(FIrst Factor)
const Login=()=>{
    const paperStyle={padding :20,height:'30vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (event) => {
        event.preventDefault(); 
        localStorage.setItem("username",username)
        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });
        user.authenticateUser(authDetails, {
            onSuccess:(data) => {
                console.log("onSuccess:", data);
                navigate('/security');
            },
            onFailure: (err) =>{                
                console.error("onFailure:", err);
                // navigate('/');
                window.location.reload();
                alert("Invalid details entered!");
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequored:", data)
            },
        });        
        
    };

    return(
        <form onSubmit={onSubmit}>
            <Grid>
            <Paper elevation={10} style={paperStyle}>            
                <TextField label='Username' placeholder='Enter username' fullWidth required value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required value={password} onChange={(event) => setPassword(event.target.value)}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle}>Next</Button>                                
            </Paper>
        </Grid>
        </form>        
    )
}

// code to authenticate security questions ( second factor auth)
const Security=()=>{
    const paperStyle={padding :20,height:'30vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    const marginTop = { marginTop: 5 }
    const navigate = useNavigate()
    const [answer, setAnswer] = useState("");
    const [selectedquestion, setSelectedquestion] = useState('');
    const onSubmit = (event) => {
        navigate('/UploadRecipes');
        event.preventDefault(); 
        
        // const api = 'https://fetclxhsytdru54ddj7aazze2i0diupc.lambda-url.us-east-1.on.aws/';
        const api = 'https://brsd562qjwduytuvbd6ygremca0ondbn.lambda-url.us-east-1.on.aws/';
            const userinfo = { "username" : localStorage.getItem("username"), "question" : selectedquestion, "answer":answer};
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
              if(response.data.body.status === 'pass'){
                navigate('/code');
              }
            else {
                // navigate('/security');
                window.location.reload(); 
                alert("Invalid details entered!");
            }             
            // response.data.body.status === 'pass' ? navigate('/code') : navigate('/security');
                         
            })
            .catch((error) => {                
              console.log(error);
              navigate('/security');
            });
            
    };
    return(
        <form onSubmit={onSubmit}>
        <Grid>
            <Paper elevation={10} style={paperStyle}>  
            <FormControl fullWidth component="fieldset" style={marginTop} align="left">   
                <FormLabel component="legend">Select security question below</FormLabel>                 
                    <Select fullWidth value={selectedquestion} onChange={(event) => setSelectedquestion(event.target.value)}>
                        <MenuItem value="What is your nickname">What's your nickname?</MenuItem>
                        <MenuItem value="What's the name of your first pet?">What's the name of your first pet?</MenuItem>
                        <MenuItem value="What's your birthplace?">What's your birthplace?</MenuItem>
                    </Select>
                </FormControl>          
                <TextField fullWidth label='Security Answer' placeholder="Enter answer" required value={answer} onChange={(event) => setAnswer(event.target.value)}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} >Next</Button>
            </Paper>
        </Grid>
        </form>        
    )
}

// code to authenticate the cipher text user entered while logging in (third factor auth)
const CipherText=()=>{
    const paperStyle={padding :20,height:'20vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    const navigate = useNavigate()
    const [code, setCode] = useState("");
    const onSubmit = (event) => {
        event.preventDefault(); 
        const api = 'https://2tvnntbibchnhz6bre2s4utqsa0atkji.lambda-url.us-east-1.on.aws/';
            const userinfo = { "username" : localStorage.getItem("username"), "code" : code};
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
            
            if(response.data.body.status === 'pass'){
                localStorage.setItem("usertype",response.data.body.usertype)
                navigate('/uploadRecipe');
            }else{
                window.location.reload(); 
                alert("Invalid details entered!");                
            }              
            })
            .catch((error) => {                
              console.log(error);
              navigate('/code');
            });
            
    };
    return(
        <form onSubmit={onSubmit}>
            <Grid>
            <Paper elevation={10} style={paperStyle}>            
                <TextField label='Code' placeholder='Enter Security Code' fullWidth required value={code} onChange={(event) => setCode(event.target.value)}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} >Next</Button>
            </Paper>
        </Grid>
        </form>
        
    )
}

export {Login,Security,CipherText};