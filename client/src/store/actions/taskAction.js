import * as actionTypes from "./types";
import axios from "axios";

export const addTask = (task) => {
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

export const addNewTask = (task) => {
  // return (dispatch) => {
  //   axios
  //     .post("https://localhost:5000/addtask", data)
  //     .then((response) => {
  //       dispatch(addTask(response.data));
  //     })
  //     .catch((error) => {
  //       dispatch(setError(error.message));
  //     });
  // };
};
