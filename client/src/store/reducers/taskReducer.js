

import * as actionTypes from "../actions/types";

const initialState = {
  tasks: [],
  error: false,
  loading: false
};

const addTask = (state = {}, action) => {
    console.log(action)
    console.log(...state.tasks)
  return {
    ...state,
    tasks: [...state.tasks,action.task],
    loading: false
  };
};
const loadAllTask = (state,action)=>{
    console.log(action.task)
    return {
         ...state,
         tasks: action.task,
         
    }
}

const setError = (state = {}, action) => {
  return {
    ...state,
    error: action.task,
  };
};
const setLoading = (state = {},action) =>{
    console.log("Set Loading reducer",action)
    return {
        ...state,
        loading:action.isloading
    }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
        return setLoading(state,action)
    case actionTypes.ADD_TASK:
       const m = addTask(state, action);
       console.log("In Reducer",m)
       return m
    case actionTypes.LOADALLTASK:
        return loadAllTask(state,action)
    case actionTypes.ERROR_TASK:
      return setError(state, action);
    default:
      return state;
      
  }
};

export default reducer;
