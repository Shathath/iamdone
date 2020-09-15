import * as actionTypes from "./types";
import axios from "axios";

export const addTask = (task) => {
  console.log("caliing in add task",task)
  return {
    type: actionTypes.ADD_TASK,
    task,
  };
};

export const errorTask = (error) => {
  return {
    type: actionTypes.ERROR_TASK,
    error,
  };
};
export const setLoading = (isloading)=>{
    return{
        type:actionTypes.SET_LOADING,
        isloading
    }
}
export const addNewTask = (task) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios
      .post("https://localhost:5000/addtask", task)
      .then((response) => {
        dispatch(setLoading(false))
        dispatch(addTask(response.data));
      })
      .catch((error) => {
        dispatch(errorTask(error.message));
      });
  };
};
