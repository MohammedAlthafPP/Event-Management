import { configureStore } from "@reduxjs/toolkit";
import { allEventsReducer, deleteEventReducer, eventDetailsReducer, newEventReducer } from "./reducer/eventReducer";
import { userReducer } from "./reducer/userReducer";




const Store = configureStore({
    reducer: {
      user: userReducer,
      newEvent: newEventReducer,
      allEvents:allEventsReducer,
      deleteEvent: deleteEventReducer,
      eventDetails :eventDetailsReducer,
      
    },
  
    
    
  });
  
  export default Store;
  