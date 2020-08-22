import axios from 'axios';
import { returnErrors } from './erroractions';
import store from '../store/configStore'
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS

} from './types';


export const Loaduser = () => {
  //   debugger;
  return function (dispatch) {
    dispatch({ type: USER_LOADING })
    const token = getUserToken()
    //  console.log(token)
    // console.log(store.getState())
    axios
      .get('http://localhost:5000/users', token)
      .then((data) => {
        console.log("e", data)
        dispatch({
          type: USER_LOADED,
          payload: data.data
        })
      })
    //       axios
    // .get('/api/auth/user', store.getState().token)
    // .then(res =>
    //   dispatch({
    //     type: USER_LOADED,
    //     payload: res.data
    //   })
    // ) 
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    //   dispatch({
    //     type: AUTH_ERROR
    //   });
    // });
  }

}

export const loginuser = (userData) => {
  // console.log(userData)
  return dispatch => {
    //    console.log(userData)
    return axios.post('http://localhost:5000/users/login', userData)

      .then((data) => {
        console.log("why am i  ", data)
        dispatch({ type: USER_LOADING })
        if (data.message) {
          //     dispatch({type:LOGIN_FAIL,payload:data.msg})
        }
        else {
          dispatch({ type: LOGIN_SUCCESS, payload: data })
        }
      }).catch((error) => {
        console.log(error.response);
        dispatch(
          returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
        );
        dispatch({ type: LOGIN_FAIL })
      })
  }
}

export const registeruser = (userData) => {
  return dispatch => {
    return axios.
      post('http://localhost:5000/users/signup', userData).
      then((data) => {
        //            console.log(data)
        if (data.message) {

        }
        else {
          dispatch({ type: REGISTER_SUCCESS, payload: data })
        }
      }).catch((error) => {
        // console.log(error.response)
        //   dispatch(returnErrors(error.response.data,error.response.status,'REGISTER_FAIL'))
      })

  }
}
export const logoutuser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_SUCCESS })
  }
}
const getUserToken = function () {
  const token = store.getState().auth.token
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  if (token) {
    //  config['x-auth-token'] = token
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config
}