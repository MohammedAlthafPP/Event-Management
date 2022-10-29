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
  CLEAR_ERRORS,
  CREATE_BRIDE_RESET,
  CREATE_GROOM_RESET,
  CREATE_MARRIAGE_RESET,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_FAIL,
  ALL_EVENTS_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  DELETE_EVENT_RESET
} from "../../constants/constants";

export const newEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BRIDE_REQUEST:
    case CREATE_GROOM_REQUEST:
    case CREATE_MARRIAGE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CREATE_BRIDE_SUCCESS:
      return {
        success: action.payload.success,
        bride: action.payload.event,
        message: action.payload.message,
      };
    case CREATE_GROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case CREATE_MARRIAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case CREATE_BRIDE_RESET:
    case CREATE_GROOM_RESET:
    case CREATE_MARRIAGE_RESET:
      return {
        ...state,
        success: false,
      };
    case CREATE_BRIDE_FAIL:
    case CREATE_GROOM_FAIL:
    case CREATE_MARRIAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


// All Events 
export const allEventsReducer = (state = {events:[]}, action) => {
  switch (action.type) {
      case ALL_EVENTS_REQUEST:
          return {
              loading : true,
          };
      case ALL_EVENTS_SUCCESS : 
          return {
              loading: false,
              events : action.payload.events,
          };
      case ALL_EVENTS_FAIL : 
          return {
              loading: false,
              error : action.payload,
          };
      case CLEAR_ERRORS : 
          return {
              ...state,
              error : null,
          };
      default:
         return state;
  }

};

// Delete Event -- Admin
export const deleteEventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    
    case DELETE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EVENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Event Details
export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload.event,
        success: action.payload.success,
      };

    case EVENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
