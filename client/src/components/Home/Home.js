import React, { Fragment, useEffect } from "react";
import "./Home.css";
import EventCards from "./EventCards";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,getAllEvents, getEventDetails} from "../../redux/action/eventAction";
import { useNavigate, useParams } from "react-router-dom";
import {toast } from 'react-toastify';


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { error, events} = useSelector((state)=> state.allEvents);
  const { error:eventDetailsError, event} = useSelector((state)=> state.eventDetails);


  useEffect(() => {

    if(error){
      toast.error(error.message);
      dispatch(clearErrors())
    }
    if(eventDetailsError){
      toast.error(eventDetailsError.message);
      dispatch(clearErrors())
    }
    dispatch(getAllEvents());
    if(id.length === 24){
      dispatch(getEventDetails(id))
    }else{
      navigate('/404')
    }
    
    
  }, [dispatch,error,navigate,id,eventDetailsError])
  
  return (
    
    <Fragment>
      {event&&event.brideDetails?.name ? (
        <Fragment>
        <div className="overlay"></div>
        <div
      className="banner"
      style={{ backgroundImage: `url(` + `${event&&event.marriageDetails?.avatar[0].url}` + `)` }}
    > 
      <h1>{event&&event.groomDetails?.name} & {event&&event.brideDetails?.name}</h1>
      <p>ARE GETTING MARRIED on { String(event&&event.marriageDetails?.date).substr(0, 10)}</p>
     
    </div>
    <div className="subheader">
    </div>
    <h2 className="heroheadeing">Bride & Groom</h2>
    <div className="groomandbrid" id="container">
      <div className="card">
        <div>
          <h2>{event&&event.groomDetails?.name}</h2>
          <p>
            You are a free spirit. You love change, adventure, and excitement.
            You love your freedom. Like a bird that needs its wings to live,
            you cannot exist without it. Freedom is the nucleus around which
            your life revolves. You need it for your very survival. By using
            freedom properly, you are able to explore and develop all of your
            varied talents. You will meet many types of people and travel
            great distances. ”
          </p>
        </div>
        <div>
          <img
            src={event&&event.groomDetails?.avatar[0]?.url}
            alt="Groom"
          />
        </div>
      </div>

      <div className="card2">
        <div>
          <img
            src={event&&event.brideDetails?.avatar[0]?.url}
            alt="Bride"
          />
        </div>
        <div>
          <h2>{event&&event.brideDetails?.name}</h2>
          <p>
            You are a free spirit. You love change, adventure, and excitement.
            You love your freedom. Like a bird that needs its wings to live,
            you cannot exist without it. Freedom is the nucleus around which
            your life revolves. You need it for your very survival. By using
            freedom properly, you are able to explore and develop all of your
            varied talents. You will meet many types of people and travel
            great distances. ”
          </p>
        </div>
      </div>
    
    </div>

    <h3 className="eventHeading">Our Events</h3>
    <div className="events">
        
        {events&&events.map((event,index)=> <EventCards event={event} key={index}/>)}
        
      </div>
      </Fragment>
      ) : (
        <div className="emptyClass">
           <h1 >No Records Found</h1>
        </div>
       
      )}
        
      
      
    </Fragment>
  );
}

export default Home;
