import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../../components/Header';
import { Alert } from '@mui/material';

import { useState,useEffect,useContext } from 'react'; ///
import axios from 'axios'

import {useNavigate}  from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



import { AuthContext } from "../../context/AuthContext";  ///



const theme = createTheme();
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Bhudnagaria-Social
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = () => {
  let navigate = useNavigate();
  const { user ,errors,dispatch} = useContext(AuthContext);  ////


const [username, setUsername] = useState('');
const [validUsername, setValidUsername] = useState(false);
const [error, setError] = useState(false);



 const checkUsername=async (event=null)=>{
   event?.preventDefault();
   const formData={
    username:username
   }
   if(!username){
    await setValidUsername(false);
   
    dispatch({ type: "SET_ERRORS", payload: "INVALID_USERNAME" });
    // dispatch({ type: "SET_ERRORS", payload: res.data });
     setError(true);
       
    return false;
   }
   const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };  
  try {

  const res = await axios.post('http://localhost:5000/api/checkusername',formData , config);
 
  if(res.data.state)

  {  await setValidUsername(true);
    return true;
  }
  else{ 
    await setValidUsername(false);
   
    dispatch({ type: "SET_ERRORS", payload: "INVALID_USERNAME" });
    // dispatch({ type: "SET_ERRORS", payload: res.data });
    setError(true);
  
    return false;
  }
  
  
} catch (error) {
  console.error(error.data);
  await setValidUsername(false);
  dispatch({ type: "SET_ERRORS", payload: "INVALID_USERNAME" });
  return false;
  }
 };

  const handleSubmit = async(event) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
    const formData={
      email: data.get('email'),
      name: data.get('name'),
      username:  data.get('username'),
      password: data.get('password'),
    };
    
    try {  
      const check=await checkUsername();
      if(!check) { 
          
        dispatch({ type: "SET_ERRORS", payload: "INVALID_USERNAME" });
        setError(true);
        return;
      }
      if(!formData.email||!formData.name||!formData.username||!formData.password) 
      {
        
        dispatch({ type: "SET_ERRORS", payload: "Some_Fields_Are_Empty" });
        setError(true);
      
        
        return;}

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
   
    const res = await axios.post('http://localhost:5000/api/signup',formData , config);
    if(res.status===200) {
      localStorage.setItem("user",res.data.token);
      navigate('/home');
        
    }
 
    
  } catch (error) {
      if(error.response.status===400) 
     { console.log(error.response.data.errors[0].msg)
    dispatch({ type: "SET_ERRORS", payload: error.response.data.errors[0].msg });

     }
     else 
    dispatch({ type: "SET_ERRORS", payload: error.message });
      console.log(error)
      console.log(error.response.status)
     setError(true);
      
    }
  };
  
  return (
    <>
      <Box sx={{ width: '100%' ,height:"3vh"}}>
      <Collapse in={error}>
        <Alert severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: -3}}
        >
        {errors.length?errors[0]:"try again something went wrong"}
        </Alert>
      </Collapse>
      
    </Box>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
            <Header/>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
             
               
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e)=>{
                    setUsername(e.target.value);
                    setValidUsername(false);
                    }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                <Button
                
                onClick={checkUsername}
                fullWidth
                variant="contained"
                sx={{ 
                height:'100%',
                // backgroundColor:'red'
                }}
                >
               Check
              </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
               
                {!validUsername ? <Alert severity='error'>Username Already Taken</Alert> : <Alert severity='success'>Username Available</Alert> }
               
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                  
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Register