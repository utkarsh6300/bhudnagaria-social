import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user:localStorage.getItem("user") || null,
    id:localStorage.getItem("id") || null,
    isAuthenticated:false,
    isFetching: false,
    error: false,
    errors:[],
    activechat:null
  };

  
  export const AuthContext = createContext(INITIAL_STATE);

  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
      localStorage.setItem("user", state.user);
      localStorage.setItem("id", state.id);
    },[state.user,state.username])
    
    return ( 
      <AuthContext.Provider
        value={{
          user: state.user,
          id: state.id,
          isFetching: state.isFetching,
          isAuthenticated:state.isAuthenticated,
          error: state.error,
          errors: state.errors,
          activechat:state.activechat,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  