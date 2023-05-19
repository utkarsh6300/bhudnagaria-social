import * as React from 'react';

import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

import { useContext } from 'react'; 
import { AuthContext } from "../../context/AuthContext";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTheme } from '@emotion/react';


const Connected = () => {
  const [connecteduser,setConnecteduser]=useState([]);
  const { error, errors,dispatch} = useContext(AuthContext);  
  
 const theme=useTheme();
useEffect(() => {
 const fetchdata= async ()=>{
  const config = {
    headers: {
      'token':localStorage.getItem('user')
    }
  };
const res= await axios.get('http://localhost:5000/api/connecteduser',config);

setConnecteduser(res.data);
// console.log(res.data);
  }
  fetchdata();
}, [])

  return ( 
    <Grid container spacing={2}>
    
        
          <ThemeProvider theme={theme}>
            <Box
              sx={{
              
              
                display: 'flex',
                flexDirection:"column",
                alignItems:"center",
                
                width:"100%",
                marginTop:"3%",
                // border:"2px solid black",
                borderRadius:"4px",
                marginBottom:"-2%",
                height:"54vh",
                overflow:"auto",
                
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                  // BackgroundColor:"#cfcfcf",
                },
                // '&::-webkit-scrollbar-track': {
                //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                // },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,.1)',
                  outline: '1px solid slategrey'
                }
              }}
            >
              {connecteduser.map((user1) => (
                <Grid    sx={{margin:"0",padding:"2%", width:"100%", display:'flex', justifyContent:'center',alignItems:"center",
                fontSize:"larger", 
                fontWeight:"bold",
                cursor:"pointer", 
                "&:hover":{
           background:"#cfcfcf",
          
                },
              }}   onClick={
                ()=>{ dispatch({type:"SET_ACTIVE_CHAT",payload:user1._id})}
              } 
              key={user1._id} >
                {/* item key={elevation} elevation={elevation}> */}
                  {/* {`elevation=${elevation}`}  */}
                  {user1.name} 
                   {/* <Link to="/messenger/chat">chat</Link> */}
                </Grid>
              ))}
            </Box>
          </ThemeProvider>
       
      
    </Grid>
  );
              }

export default Connected