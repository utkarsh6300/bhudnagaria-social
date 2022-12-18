import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user:localStorage.getItem("user") || null,
    isAuthenticated:false,
    isFetching: false,
    error: false,
    errors:[]
  };

  
  export const AuthContext = createContext(INITIAL_STATE);

  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
      localStorage.setItem("user", state.user)
    },[state.user])
    
    return ( 
      <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          isAuthenticated:isAuthenticated,
          error: state.error,
          errors: state.errors,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  