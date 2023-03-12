import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Typography from '@mui/material/Typography';
import { Link,Button } from '@mui/material';



function Copyright(props) {
  const {dispatch,isAuthenticated}=useContext(AuthContext);
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Bhudnagaria-Social
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
       { isAuthenticated=="true" &&<Button variant="contained" color="error" 
        sx={{
          marginLeft:"1%"
        }}
        onClick={()=>{
        dispatch({type:"LOGIN_FAILURE",payload:"RELOGIN TO VIEW PAGE"});
      }}
        >Logout</Button>}
      </Typography>
    );
  }

export default Copyright
