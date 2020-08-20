import { combineReducers } from "redux";

// import errorReducer from './errorreducer';
// import authReducer from './authReducer';
import taskReducer from "./taskReducer";
// import notifyReducer from './notifyReducer';

export default combineReducers({
  task: taskReducer,
});
