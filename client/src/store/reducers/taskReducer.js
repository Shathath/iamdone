
import * as actionTypes from "../actions/types";

const initialState = {
  tasks: [],
  error: false,
  loading: false
};

const addTask = (state = {}, action) => {
  return {
    ...state,
    tasks: [...state.tasks,action.task],
    loading: false
  };
};

const setError = (state = {}, action) => {
  return {
    ...state,
    error: action.task,
  };
};
const setLoading = (state = {},action) =>{
    return {
        ...state,
        loading:action.loading
    }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
        return setLoading(state,action)
    case actionTypes.ADD_TASK:
      return addTask(state, action);
case actionTypes.ERROR_TASK:
      return setError(state, action);
    default:
      return state;
      
  }
};

export default reducer;
