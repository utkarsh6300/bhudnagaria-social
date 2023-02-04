import Home from "./pages/Home/Home";
import Register from"./pages/Register/Register";
import Login from"./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";
import Chat from "./pages/chat/Chat";
import Connected from "./pages/connected/Connected";
import Online from "./pages/online/Online";
import Connect from "./pages/connect/Connect";

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

//verify token

  // useEffect(() => {
  //   const user=localStorage.getItem('user');
  //   const id=localStorage.getItem('id');
  //   if(user&&id) dispatch({type:"LOGIN_SUCCESS",payload:{user,id}});
  // }, [])
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Home /> : <Register />}/> 
        <Route  path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/register" />}/> 
        <Route path="/login"  element= {isAuthenticated ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />}/>
        <Route path="/messenger" element = {!isAuthenticated ?   <Messenger />:<Navigate to="/" />} > 
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
