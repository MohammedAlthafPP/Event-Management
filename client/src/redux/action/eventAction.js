import axios from "../../axios";
import {
    CREATE_BRIDE_FAIL,
    CREATE_BRIDE_REQUEST,
    CREATE_BRIDE_SUCCESS,
    CREATE_GROOM_FAIL,
    CREATE_GROOM_REQUEST,
    CREATE_GROOM_SUCCESS,
    CREATE_MARRIAGE_FAIL,
    CREATE_MARRIAGE_REQUEST,
    CREATE_MARRIAGE_SUCCESS,
    ALL_EVENTS_SUCCESS,
    ALL_EVENTS_FAIL,
    ALL_EVENTS_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    CLEAR_ERRORS
  } from "../../constants/constants";



  // Create Bride
export const craeteBride = (bride) =>async (dispatch) => {
    try {
        dispatch({type : CREATE_BRIDE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const {data} = await axios.post(`/admin/event/bride`,bride,config);

        dispatch({
            type : CREATE_BRIDE_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : CREATE_BRIDE_FAIL,
            payload : error.response.data,
        })
        
    }
};


// Create Groom
export const craeteGroom = (groom) =>async (dispatch) => {
    try {
        dispatch({type : CREATE_GROOM_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const {data} = await axios.put(`/admin/event/groom`,groom,config);

        dispatch({
            type : CREATE_GROOM_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : CREATE_GROOM_FAIL,
            payload : error.response.data,
        })
        
    }
};


// Create Marriage
export const craeteMarriage = (marriage) =>async (dispatch) => {
    try {
        dispatch({type : CREATE_MARRIAGE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const {data} = await axios.put(`/admin/event/marriage`,marriage,config);

        dispatch({
            type : CREATE_MARRIAGE_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : CREATE_MARRIAGE_FAIL,
            payload : error.response.data,
        })
        
    }
};

// Get All Events
export const getAllEvents = () =>async (dispatch) => {
    try {
        dispatch({type : ALL_EVENTS_REQUEST});

        const {data} = await axios.get(`/events`);

        dispatch({
            type : ALL_EVENTS_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : ALL_EVENTS_FAIL,
            payload : error.response.data,
        })
        
    }

};

// Delete Event
export const deleteEvent = (id) =>async (dispatch) => {
    try {
        dispatch({type : DELETE_EVENT_REQUEST });

        const {data} = await axios.delete(`/admin/event/${id}`);

        dispatch({
            type : DELETE_EVENT_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : DELETE_EVENT_FAIL,
            payload : error.response.data,
        })
        
    }

};

// Get Event Details 
export const getEventDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: EVENT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/event/${id}`);
  
      dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EVENT_DETAILS_FAIL, payload: error.response.data });
    }
  };


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  