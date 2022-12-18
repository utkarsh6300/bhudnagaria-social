import Home from "./pages/Home/Home";
import Register from"./pages/Register/Register";
import Login from"./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";



const user="";

function App() {
  const {user,isAuthenticated}=useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Home /> : <Register />}/> 
        <Route  path="/home" element={isAuthenticated ? <Home /> : <Register />}/> 
        <Route path="/login"  element= {isAuthenticated ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />}/>
        <Route path="/messenger" element = {!isAuthenticated ? <Navigate to="/" /> : <Messenger />}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </Router>
  );
}

export default App;
