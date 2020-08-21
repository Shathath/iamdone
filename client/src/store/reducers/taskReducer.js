import * as actionTypes from "../actions/types";

const initialState = {
  tasks: null,
  error: false,
};

const addTask = (state = {}, action) => {
  return {
    ...state,
    tasks: action.task,
  };
};

const setError = (state = {}, action) => {
  return {
    ...state,
    error: action.task,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      addTask(state, action);
    case actionTypes.ERROR_TASK:
      setError(state, action);
    default:
      return state;
  }
};

export default reducer;
