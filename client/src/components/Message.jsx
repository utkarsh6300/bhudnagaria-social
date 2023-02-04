import { Box,Typography } from '@mui/material'
import React from 'react'

const Message = (props) => {
  return (
  props.message.map((msg1)=>(

    <Box key={msg1.id}
    sx={{
 display:"flex",
//  justifyContent:`${props.align}`,
 padding:"0.1% 1%",

    }}
   
    > <Typography variant="p" color="initial" ref={props.lastMessageRef}>
{msg1.data}
    </Typography>
      {/* <p  ref={props.lastMessageRef}>hii
{msg1.data}
      </p> */}

    </Box>
  )))
}

export default Message