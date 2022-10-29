import axios from "../../axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
  } from "../../constants/constants";
  

// Login
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/login`, { email, password }, config);
      if (data&&data.user) {
        await localStorage.setItem("Udetails", JSON.stringify(data.user));
      }
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
};
  
// Register
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/register`, userData, config );
  
      if (data&&data.user) {
        await localStorage.setItem("Udetails", JSON.stringify(data.user));
      }
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data,
      });
    }
};


// Load User
export const loadUser = () => async (dispatch) => {
  try {

    dispatch({ type: LOAD_USER_REQUEST });

    const details =await JSON.parse(localStorage.getItem("Udetails"));
    if (details && Object.keys(details).length === 0) {
    } else {
      if (details && details._id) {
        const { data } = await axios.get(`/user/${details._id}`);
        console.log(data);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
      
      }
    }

  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await localStorage.removeItem("Udetails");
    await axios.get(`/logout`);

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};



// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  