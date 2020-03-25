import React from 'react';
import {useSelector} from 'react-redux';

//-----< Component Imports >-----\\
import EventItem from './EventItem';

export default function EventList(props) {

  const events = useSelector(state=>state.event);

  //Renders events to the DOM based on whether they are 'upcoming' or 'past' (stored in timing arg)
  function renderEvents(timing) {

    if (events.length>0) {
      //Get today's date
      let dateNow = new Date();
      let myEvents = events.map( (item,i) => {
        //Get the date of the event...
        let eventDate = new Date(item.date)
        //...and only render if it meets requirements
        if ( (eventDate<dateNow && timing==='past') || (eventDate>dateNow && timing==='upcoming') ) {
          return <EventItem key={i} event={item} last={(events.length-1 === i)}/>
        }
        return false;
      }).filter( item=>item!==false );

      if (myEvents.length>0) {
        console.log('myEvents:',myEvents);
        
        return myEvents;
      } else {
        return <p className="no-events">There are no {timing} events.</p>
      }
    }
  }

  return (
    <div>
      <div className="sec-default">
        <h2>Upcoming Events</h2>
        {renderEvents('upcoming')}
      </div>
      <div className="sec-default">
        <h2>Past Events</h2>
        {renderEvents('past')}
      </div>
    </div>
  )
}