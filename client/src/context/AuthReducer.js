 const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          user: null,
          id:null,
          isFetching: true,
          error: false,
        };
        case "LOGIN_SUCCESS":
          return {
            ...state,
            user: action.payload.user,
            id: action.payload.id,
            isFetching: false,
            isAuthenticated:true,
          error: false,
          errors:[]
        };
        case "LOGIN_FAILURE":
          return {
            ...state,
            user: null,
          id:null,
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
        case "RESET_ERRORS":
          return {
            ...state,
            error: false,
            errors:[]
        };
        case "AUTHENTICATE":
          return {
            ...state,
            isAuthenticated:true
        };
        case "UN_AUTHENTICATE":
          return {
            ...state,
            isAuthenticated:false
        };
        case "SET_ACTIVE_CHAT":
          return {
            ...state,
            activechat:action.payload
        };
        case "REMOVE_ACTIVE_CHAT":
          return {
            ...state,
            activechat:null
        };
        default: return state;
     
    }
  };
  
  export default AuthReducer;
  