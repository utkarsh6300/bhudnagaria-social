import React from 'react'
import {useNavigate}  from 'react-router-dom';

import { useState,useContext } from 'react'; 
import { AuthContext } from "../../context/AuthContext";

import axios from 'axios'

import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Box,Container,CssBaseline } from '@mui/material';
import {Avatar,Button,Alert,Collapse,IconButton} from '@mui/material';
import { Typography ,Grid,Link,TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



import CloseIcon from '@mui/icons-material/Close';


import Header from '../../components/Header'
import Copyright from '../../components/Copyright';
import Error from '../../components/Error';



const theme = createTheme();

const Login = () => {
  let navigate = useNavigate();

  const { error, errors,dispatch} = useContext(AuthContext);  

  // const [error, setError] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
const formData={
      email: data.get('email'),
      username: data.get('email'),
      password: data.get('password'),
    };
    try {  
     
      if(!formData.email||!formData.username||!formData.password) 
      {
        
        dispatch({ type: "SET_ERRORS", payload: "Some_Fields_Are_Empty" });
        // setError(true);
      
        
        return;}

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
   
    const res = await axios.post('http://localhost:5000/api/login',formData , config);
    if(res.status===200) {
      // localStorage.setItem("user",res.data.token);
      // localStorage.setItem("username",res.data.username);

      dispatch({ type: "LOGIN_SUCCESS",payload:{user:res.data.token,id:res.data.id}});
      dispatch({ type: "AUTHENTICATE"});
      navigate('/home');
        
    }
 
    
  } catch (error) {
      if(error.response.status===400) 
      { console.log(error.response.data.errors[0].msg)
        dispatch({ type: "SET_ERRORS", payload: error.response.data.errors[0].msg });
        
      }
      else 
         if(error.response.status===500) 
    dispatch({ type: "SET_ERRORS", payload: error.message });
    else 
    dispatch({ type: "SET_ERRORS", payload: "something went wrong" });
      console.log(error)
      console.log(error.response.status)
    //  setError(true);

      
    }
  
  }; 

  return (
<ThemeProvider theme={theme}>
    {/* <Box sx={{ width: '100%' ,height:"3vh"}}>
      <Collapse in={error}>
        <Alert severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                // setError(false);
    dispatch({ type: "ReSET_ERRORS"});

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
      
    </Box> */}
    <Error/>
<Container component="main" maxWidth="xs">
<CssBaseline />
  <Box
          sx={{
            marginTop: 4,
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address Or UserName"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

  <Copyright sx={{ mt: 8, mb: 4 }} />
</Container>
 </ThemeProvider>
  )
}

export default Login