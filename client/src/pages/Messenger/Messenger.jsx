import React from 'react'
import { Outlet,Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState,useContext } from 'react'; 
import { AuthContext } from "../../context/AuthContext";

import { Box,Container,CssBaseline } from '@mui/material';


import Header from '../../components/Header'
import Copyright from '../../components/Copyright';
import Error from '../../components/Error';
import Messenger_Navbar from '../../components/Messenger_Navbar';


const theme = createTheme();
const Messenger = () => {
  const { error, errors,dispatch} = useContext(AuthContext);  

  return (
    <ThemeProvider theme={theme}>
   
    <Error/>
<Container component="main" >
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
   </Box>

  <Box>
    <Messenger_Navbar/>
   <Outlet/>
   </Box>
  <Copyright sx={{ mt: 5, mb: 4 }} />
</Container>
 </ThemeProvider>
  )
}

export default Messenger