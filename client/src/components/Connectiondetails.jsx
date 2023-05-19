import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {  Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

const Connectiondetails = ({id,name}) => {
  const handleacceptconnectionrequest=async(e)=>{
    e.preventDefault();
    try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('user')
      }
    };
    const formData={
      connectionid:id
    }
  
    const res1 = await axios.post('http://localhost:5000/api/connectionrequest/accept',formData , config);
    // show alert accept request
    console.log(res1);
  } catch (error) {
    // show alert accept request failed
      console.error(error);
  }
  
  }
  return (
    <Paper
    sx= {{width:"100%",padding:"1%",margin:"0",display:"flex",flexDirection:"row",alignItems:"center" }}
    >
    <Typography variant="p" color="initial" width="90%">{name}</Typography>
    <IconButton aria-label="connect"  type="button" sx={{ }}
    onClick={handleacceptconnectionrequest}
    >
      <PersonAddIcon/>
    </IconButton>
    </Paper>
  )
}

export default Connectiondetails