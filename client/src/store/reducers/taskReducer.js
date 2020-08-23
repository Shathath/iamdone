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
      return addTask(state, action);
      break;
    case actionTypes.ERROR_TASK:
      return setError(state, action);
    default:
      return state;
      break;
  }
};

export default reducer;
