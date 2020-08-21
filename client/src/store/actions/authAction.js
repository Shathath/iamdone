import * as actionTypes from "./types";
import Axios from "axios";

export const addNewUser = (user) => {
  return {
    type: actionTypes.NEW_USER,
    user: user,
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};

export const authUser = (user) => {
  const data = {
    email: user.email,
    password: user.password,
  };
  return (dispatch) => {
    Axios.post("https://localhost:5000/signup", data)
      .then((response) => dispatch(addNewUser(response.data)))
      .catch((error) => dispatch(setError(error.message)));
  };
};
