import React from 'react'
import ConnectionRequestAccept from './ConnectionRequestAccept'
import ConnectionRequestSend from './ConnectionRequestSend'
import { Box,Container,CssBaseline } from '@mui/material';
import Divider from '@mui/material/Divider';



const Connect = () => {
  return (
<>
<Box
sx={{
  display:"flex",
  alignItems:'flex-start',
   height:"58vh"
}}
>
  <Box
  sx={{
    display:"flex",
    // alignItems:'center',
    width:"50%",
    margin:"1%",
    padding:"1%",
  }}
  >
<ConnectionRequestSend/>
  </Box>
  <Divider sx={{ height: "98%", m: 2 }} orientation="vertical" />

  <Box
    sx={{
      display:"flex",
      // alignItems:'center',
      width:"50%",
      margin:"1%",
      padding:"1%",
    }}
  >
<ConnectionRequestAccept/>
  </Box>
</Box>

</>
  )
}

export default Connect