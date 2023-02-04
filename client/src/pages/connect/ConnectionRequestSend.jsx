import React from 'react'
import { useState,useContext } from 'react'; 
import { AuthContext } from "../../context/AuthContext";

import {  Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { height } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Connectiondetails from '../../components/Connectiondetails';
import axios from 'axios';

const ConnectionRequestSend = () => {
  const { user} = useContext(AuthContext);  
  const [currentsearchoutput, setcurrentsearchoutput] = useState({  id:0,name:"search to show user"});
  const [currentsearchinput, setcurrentsearchinput] = useState('');

const handlesendconnectionrequest=async(e)=>{
  e.preventDefault();
  try {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'token':user
    }
  };
  const formData={
    connectionid:currentsearchoutput.id
  }

  const res1 = await axios.post('http://localhost:5000/api/connectionrequest/send',formData , config);
  // show alert send request
  console.log(res1);
} catch (error) {
  // show alert send request failed
    console.error(error);
}

}

  const handleinput=(e)=>setcurrentsearchinput(e.target.value);
  const handlesearch=async(e)=>{
    e.preventDefault();
    try { 
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token':user
        }
      };
      const formData={
        email:currentsearchinput
      }
    
      const res1 = await axios.post('http://localhost:5000/api/searchuser',formData , config);
      const obj={
        id:res1.data.id,
        name:res1.data.name
      }
    await  setcurrentsearchoutput(obj);
    // console.log(res1);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
    sx={{  display: 'flex', width: "100%",flexDirection:"column" }}
    >
    <Box
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'flex-start', width: "100%" }}
    
    >
      {/* <h3>Add Friend</h3> */}
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Username or Email" 
        onChange={handleinput}
        onKeyDown={(e)=>{e.key==='Enter' &&( e.preventDefault() && handlesearch())}} 
        />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
      onClick={handlesearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>

        </Box>
   <Paper
    sx={{ m:1,p: '2px 4px', display: 'flex', alignItems: 'center',flexDirection:"column", width: "96%" ,height:"52vh",
   overflow:"auto",
  }}
    >
{ currentsearchoutput.id==0?
   
      <Paper
      sx= {{width:"100%",padding:"1%",margin:"0",display:"flex",flexDirection:"row",alignItems:"center" }}
      >
      <Typography variant="p" color="initial" width="90%">{currentsearchoutput.name}</Typography>
  </Paper>
      :
     <Paper
     sx= {{width:"100%",padding:"1%",margin:"0",display:"flex",flexDirection:"row",alignItems:"center" }}
     >
     <Typography variant="p" color="initial" width="90%">{currentsearchoutput.name}</Typography>
     <IconButton aria-label="connect"  type="button" sx={{ }} 
      onClick={handlesendconnectionrequest}
     
     >
       <PersonAddIcon/>
     </IconButton>
     </Paper>
}
     {/* <Connectiondetails name={"austin 2"}/> */}
    

    
   </Paper>
    
  </Box>
  )
}

export default ConnectionRequestSend