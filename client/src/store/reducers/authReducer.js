import * as actionTypes from "../actions/types";

const initialState = {
  user: null,
  userid: null,
  isAuthenicated: false,
  token: null,
  error: null,
  loading: false,
};

const addNewUser = (state, action) => {
  localStorage.setItem("token", action.token);
  return {
    ...state,
    user: action.user,
    isAuthenicated: true,
    token: action.token,
    userid: action.userid,
    loading: false,
  };
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authLogout = (state, action) => {
  return {
    ...state,
    error: null,
    token: action.token,
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return addNewUser(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
