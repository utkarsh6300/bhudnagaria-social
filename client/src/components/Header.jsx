import React from 'react'
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <Typography component="h2" variant="h6" color="inherit" gutterBottom
    sx={{
        backgroundColor:"#acc9d2",
        width:'100%',
      textAlign:'center',
      padding:"2%",
      borderRadius:'2px'
    }}
    >
      Bhudnagaria-Social
    </Typography>
    
  )
}

export default Header