import React from 'react';
import styled from 'styled-components';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import EventWidget from './EventWidget';
import { useSelector } from 'react-redux';

/*-----< Component Imports >-----*/
import ManagerTitle from '../ManagerTitle';

/*-----< Styling >-----*/
const NoEventsMessage = styled.p`
  text-align: center;
  font-size: 1em;
`;

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
    }).filter(event=>event);

    console.log('The current eventList:',eventList,timing);
    

    if (eventList.length>0) {
      return eventList;
    } else {
      return <NoEventsMessage>There are no {timing} events.</NoEventsMessage>
    }
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