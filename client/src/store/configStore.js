import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootreducer from "./reducers/rootreducer";
const initialState = {};
const middleware = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootreducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
