import React from 'react'
import {  Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';

import Connectiondetails from '../../components/Connectiondetails';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const ConnectionRequestAccept = () => {
  const [connectionrequestspending, setconnectionrequestspending] = useState([]);
  useEffect(() => {
    const fetchdata= async ()=>{
      const config = {
        headers: {
          'token':localStorage.getItem('user')
        }
      };
    const res= await axios.get('http://localhost:5000/api/connecteduser/requests',config);
    
    console.log(res.data);
    setconnectionrequestspending(res.data.connectionrequest);
    // console.log(connectionrequestspending.connectionrequest);
      }
      fetchdata();
  }, [])
  
  return (
  
  <>
  
  <Box
    sx={{  display: 'flex', width: "100%",flexDirection:"column" }}
    >
    <Box
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'flex-start', width: "100%" }}
    
    >
       <Box
     
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
      >

      <Typography variant="h5" color="initial"
      sx={{fontSize:"100%" ,fontWeight:"bold"}}
      >ConnectionRequests</Typography>
      </Box>
     

        </Box>
   <Paper
    sx={{ m:1,p: '2px 4px', display: 'flex', alignItems: 'center',flexDirection:"column", width: "96%" ,height:"52vh",
   overflow:"auto",
  }}
    >
{
   connectionrequestspending.length===0?
      <Paper
      sx= {{width:"100%",padding:"1%",margin:"0",display:"flex",flexDirection:"row",alignItems:"center" }}
      >
      <Typography variant="p" color="initial" width="90%">No Pending Request</Typography>
  </Paper>
 :  connectionrequestspending.map((id)=>{

  return <Connectiondetails key={id} id={id}/>
 })
    //  <Paper
    //  sx= {{width:"100%",padding:"1%",margin:"0",display:"flex",flexDirection:"row",alignItems:"center" }}
    //  >
    //  <Typography variant="p" color="initial" width="90%">second</Typography>
    //  <IconButton aria-label="connect"  type="button" sx={{ }} 
    //   // onClick={handleacceptconnectionrequest}
     
    //  >
    //    <PersonAddIcon/>
    //  </IconButton>
    //  </Paper>
     
     }

     </Paper>
     </Box>
  </>
  )
}

export default ConnectionRequestAccept