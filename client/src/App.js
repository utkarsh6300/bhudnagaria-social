import Home from "./pages/Home/Home";
import Register from"./pages/Register/Register";
import Login from"./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";
import Chat from "./pages/chat/Chat";
import Connected from "./pages/connected/Connected";
import Online from "./pages/online/Online";
import Connect from "./pages/connect/Connect";
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext,useEffect } from "react";
import { AuthContext } from "./context/AuthContext";





function App() {
  const {isAuthenticated,dispatch}=useContext(AuthContext);
  const user=localStorage.getItem('user');
  const id=localStorage.getItem('id');
  async function  verify() {
    try {
      const config = {
        headers: {
          
          'token': user,
         
        }
      }
      const res= await axios.get('http://localhost:5000/api/authenticate',config);
      // const data= await res.json();
      // console.log(res.data[0]);
     console.log(res);
     dispatch({type:"AUTHENTICATE"});
     return true;
    }
    catch (error) {
      console.log(error);
      sessionStorage.removeItem('id_token');
      dispatch({type:"UN_AUTHENTICATE"});
     return false;
    }
  } 
//verify token

 const temp=()=>setInterval(() => {
 
  user&&id&&verify();

 },300000);
 
  useEffect(() => {
   
    if(user&&id&&verify()) {
      
      dispatch({type:"LOGIN_SUCCESS",payload:{user,id}});
      temp();
  }

  }, [])
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated=="true" ? <Navigate to="/messenger" />: <Register />}/> 
        <Route  path="/home" element={isAuthenticated=="true" ? <Navigate to="/messenger" /> : <Navigate to="/register" />}/> 
        <Route path="/login"  element= {isAuthenticated=="true" ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={isAuthenticated=="true" ? <Navigate to="/" /> : <Register />}/>
        <Route path="/messenger" element = {isAuthenticated=="true" ?   <Messenger />:<Navigate to="/" />} > 
          <Route index element={<Chat/>}/>
          {/* <Route path="online" element={<Online/>}/> */}
          <Route path="chat"  element={<Chat/>}/>
          {/* <Route path="connected" element={<Connected/>}/> */}
          <Route path="connect" element={<Connect/>}/>
       
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </Router>
  );
}

export default App;
