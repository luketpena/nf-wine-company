import React from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import EventWidget from './EventWidget';
import { useSelector } from 'react-redux';

/*-----< Component Imports >-----*/
import ManagerTitle from '../ManagerTitle';

/*-----< Component Function >-----*/
export default function EventLanding() {

  let events = useSelector(state=>state.event);
  
  //Renders events to the DOM based on whether they are 'upcoming' or 'past' (stored in timing arg)
  function renderEvents(timing) {
    //Get today's date
    let dateNow = new Date();
    let eventList = events.map( (event,i) => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it meets requirements
      if ( (eventDate<dateNow && timing==='past') || (eventDate>dateNow && timing==='upcoming') ) {
        return <EventWidget key={event.id} event={event} index={i}/>
      }
      return false;
    });
    return eventList;
  }

  return (
    <div>
      <ManagerTitle title="Events" target="/manager" />

      <section>
        <TravelButton target="/manager/events/new" text="Create New Event" propClass="button-secondary center-block"/>
      </section>

      <section className="section-box">
        <h2>Upcoming Events</h2>
        {renderEvents('upcoming')}
      </section>

      <section className="section-box">
        <h2>Past Events</h2>
        {renderEvents('past')}
      </section>

    </div>
  )
}