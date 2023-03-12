import React from 'react'
import { useState,useContext } from 'react'; 
import { AuthContext } from "../context/AuthContext";
import { Box,Container,CssBaseline } from '@mui/material';
import {Avatar,Button,Alert,Collapse,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Error = () => {
  const { error, errors,dispatch} = useContext(AuthContext);  

  return (
    <Box sx={{ width: '100%' ,height:"3vh"}}>
      <Collapse in={error}>
        <Alert severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                // setError(false);
    dispatch({ type: "RESET_ERRORS"});

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
  )
}

export default Error