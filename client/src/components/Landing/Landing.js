import React, { useEffect } from 'react';
import "./Landing.css";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useNavigate } from 'react-router-dom';
import { getAllEvents,clearErrors} from "../../redux/action/eventAction";
import { useDispatch, useSelector } from "react-redux";
import {toast } from 'react-toastify';


function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, events} = useSelector((state)=> state.allEvents);

  useEffect(() => {
    if(error){
      toast.error(error.message);
      dispatch(clearErrors())
    }
    dispatch(getAllEvents());
  }, [dispatch,error,navigate])

  const eventHandle = ()=>{
    if(events){
      let eventsList = events.filter((event)=> event.brideDetails?.name && event.groomDetails?.name&&event.marriageDetails?.date)
      const data = eventsList.at();
      if(data&&data._id){
        navigate(`/events/${data._id}`)
      }else{
        toast.info('No records Found')
      }
      
    }
      
    

   
  }
  return (
    <div className='homecontainer'>
      <div className="heroSection" onClick={eventHandle}>
        <LocalActivityIcon/>
        <h4>Hi, Go to Events </h4>

      </div>
      
    </div>
  )
}

export default Landing