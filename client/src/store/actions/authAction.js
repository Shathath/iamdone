import * as actionTypes from "./types";
import axios from "axios";

export const addNewUser = (tokenid, user, userid) => {
  return {
    type: actionTypes.NEW_USER,
    token: tokenid,
    user,
    userid,
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    loading: true,
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT,
    token: null,
  };
};

export const authUser = (email, password, isSignup) => {
  const data = {
    email,
    password,
  };
  return (dispatch) => {
    dispatch(authStart());
    if (!!isSignup) {
      return axios
        .post("http://localhost:5000/users/signup", data)
        .then((response) => {
          dispatch(
            addNewUser(
              response.data.tokenid,
              response.data.email,
              response.data.id
            )
          );
        })
        .catch((error) => dispatch(setError(error.message)));
    } else {
      return axios
        .post("http://localhost:5000/users/login", data)
        .then((response) => {
          //console.log(response.data);
          dispatch(
            addNewUser(
              response.data.tokenid,
              response.data.email,
              response.data.id
            )
          );
        })
        .catch((error) => dispatch(setError(error.message)));
    }
  };
};
export const loadAllTask = (params)=>{
    
    return (dispatch)=>{

    
    axios.get("https://localhost:5000/alltasks").then((response)=>{
        
        console.log(response.data)
        
        
    }).catch((error)=>{
        
    })
}
}
export const authCheckhandler = () => {
  console.log("calling");
  const token = localStorage.getItem("token");
  console.log(token);
  const getUserToken = function () {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      //  config['x-auth-token'] = token
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  };
  return (dispatch) => {
    axios
      .get("http://localhost:5000/users", getUserToken())

      .then((response) => {
        console.log(response.data);
        dispatch(addNewUser(token, response.data.email, response.data.id));
      })
      .catch((error) => dispatch(setError(error.message)));
  };
};


