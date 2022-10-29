import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function EventCards({ event }) {
  return (
    <Fragment>
        {event&& event.brideDetails?.name && event.groomDetails?.name&&event.marriageDetails?.date && (
          <Link to={`/events/${event._id}`}>
          <div className="eventCard">
            <img src={event.marriageDetails?.avatar[0]?.url} alt="User" />
            <p>
              {event && event.groomDetails?.name} &{" "}
              {event && event.brideDetails?.name}
            </p>
            <span className="eventCardCommentt">
              You are a free spirit. You love change, adventure, and
              excitement. You love your freedom. Like a bird that needs its
              wings to live, you cannot exist without it. Freedom is the
              nucleus around which
            </span>
          </div>
        </Link>
        )}
      
          
       
    </Fragment>
  );
}

export default EventCards;
