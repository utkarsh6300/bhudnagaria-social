import { Box,Typography } from '@mui/material'
import React, { useContext } from 'react'

import { AuthContext } from "../context/AuthContext";

const Message = (props) => {
  const {id,error, errors,dispatch} = useContext(AuthContext);
  return (
    props.message.map((msg1)=>(
      // msg1.senderId===user?'flex-end':'flex-start'
      
    <Box key={msg1._id}
    justifyContent={ msg1.sender==id?'flex-end':'flex-start'}
    sx={{
 display:"flex",
//  justifyContent:'flex-end',
 padding:"0.1% 1%",

    }}
   
    > <Typography variant="p" color="initial" 
   
    ref={props.lastMessageRef}>
{msg1.text}
    </Typography>
      {/* <p  ref={props.lastMessageRef}>hii
{msg1.data}
      </p> */}

    </Box>
  )))
}

export default Message