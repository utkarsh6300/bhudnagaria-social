import React, { useState } from 'react'

import Connected from '../connected/Connected';
import Message from '../../components/Message';
// import Chat from '../chat/Chat';
import Online from '../online/Online'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import { useContext,useEffect,useRef } from 'react'; 
import { AuthContext } from "../../context/AuthContext";

import { io } from "socket.io-client";
const socket=io("http://localhost:8900");


const Chat = () => {
  const lastMessageRef = useRef(null);
  // const [activechat, setActivechat] = useState(null);
  const [msg, setMessages] = useState([{id:"2355",data:"utjk"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},
  {id:"2355456",data:"utj"},

]);
  const {activechat, user,id,error, errors,dispatch} = useContext(AuthContext);
  const [currentmessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  useEffect(() => {
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("addUser",id);
   
  });
  socket.on("getMessage",(data)=>{
    setMessages(prev=>[...prev,data]);
    console.log(data); 
  });
  socket.on("getError",(data)=>{
    console.log(data); 
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  return () => {
    socket.off('getMessage'); 
  };
}, []);

  const handleChange = (event) => {
    setCurrentMessage(event.target.value); 
    // console.log(event.target.value); 
  }
  const handleSubmit = (event) => {
    event.preventDefault();
   
   activechat && socket.emit("sendMessage",{senderId:id,receiverId:activechat,text:currentmessage });
    // , (response) => {
    //   console.log(response.status); // ok
    // });
    // console.log(currentmessage);
    // Send the message to the server or save it to the database here
    setCurrentMessage('');
  }
  
  const theme=useTheme()
  return (
    <ThemeProvider theme={theme}>
   <Grid container sx={{
    padding:"2%",
    marginBottom:"-1%",
    paddingTop:"2%",
    // border:"2px solid black"
   }}>
     <Grid item xs={3}>
      <Connected/>
     </Grid>
     <Grid item xs={8}
     sx={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-end",
      margin:"-0.9% 0",
    // marginBottom:"0",
      padding:'1%',
      textAlign:"center",
      // border:"2px solid grey",
     }}
     >
   { !activechat  ?<p>
       Nothing to Show select a chat to start chatting
      </p> :
      <Grid
      sx={{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        height:"40vh",
        overflowY:"scroll",
        // border:"2px solid black"
      }}
      >
{
  // msg.map((msg1)=>(
    // <Message key={msg1.id} align="flex-end" msg={msg1.data}/>
    // ))
    <Message message={msg}  lastMessageRef={lastMessageRef}/>
}
{/* <Message align="flex-end" msg="hello"/>
<Message align="flex-end" msg="hello"/>
<Message align="flex-start" msg="hello"/>
<Message align="flex-end" msg="hello"/> */}


      
   
</Grid>
      }

{/* <Grid 
 sx={{ 
  display:"flex",
  flexDirection:"row",
  // justifyContent:"flex-end",
    width:"100%",
 }}
> */}
{/* <Box
sx={{
  display:"flex",
   width:"90%",
   margin:"0",
   padding:"0",
}}
>

<input type="text" name="msg" id="msg" placeholder='Enter Message' style={{
  
  width: "-webkit-fill-available",
}}/>
</Box> */}
{/* <Box
sx={{
  display:"flex",
width:"13%",
marginRight:"-1%",
}}
>


<input type="button" value="Send" style={{
 
  width: "-webkit-fill-available",
}}/>
</Box> */}
<TextField
         onChange={handleChange}
         value={currentmessage}
        label="Enter Message"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit} 
              // onKeyDown={(e)=>e.key==='Enter'&&console.log("enter")}
             edge="end" color="primary">
                <SendIcon  />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
{/* </Grid> */}

     </Grid>
     {/* <Grid item xs={2}>
      <Online/>
     </Grid> */}
   </Grid>
    </ThemeProvider>
  )
}

export default Chat