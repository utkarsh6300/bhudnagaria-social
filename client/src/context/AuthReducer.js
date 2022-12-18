 const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
          errors:[]
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
          errors:[action.payload]
        };
        case "SET_ERRORS":
          return {
            ...state,
            error: true,
            errors:[action.payload]
        };
     
    }
  };
  
  export default AuthReducer;
  