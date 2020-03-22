import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import EventItem from './EventItem';

const Container = styled.div`
  .intro {
    text-align: center;
  }
`;

const EventBox = styled.div`
  .no-events {
    text-align: center;
  }
`;

const Landing = styled.div`
  padding: 128px 16px;
`;

// const eventList = [
//   {
//     name: 'event 1',
//     date: '03/30/2020',
//     location: 'My place',
//     time: '17:00',
//     description: 'Quarantine party, woot!'
//   },
//   {
//     name: 'event 2',
//     date: '03/30/2020',
//     location: 'My place',
//     time: '17:00',
//     description: 'Wine for everyone!'
//   },
//   {
//     name: 'event 3',
//     date: '03/30/2020',
//     location: 'My place',
//     time: '17:00',
//     description: 'Yet another event test text!'
//   }
// ]

export default function Events() {

  const eventList = useSelector(state=>state.event);


  //Renders events to the DOM based on whether they are 'upcoming' or 'past' (stored in timing arg)
  function renderEvents(timing) {

    if (eventList.length>0) {
      //Get today's date
      let dateNow = new Date();
      let myEvents = eventList.map( (item,i) => {
        //Get the date of the event...
        let eventDate = new Date(item.date)
        //...and only render if it meets requirements
        if ( (eventDate<dateNow && timing==='past') || (eventDate>dateNow && timing==='upcoming') ) {
          return <EventItem key={i} event={item} last={(eventList.length-1 === i)}/>
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
    <Container>
      <Landing>
        <h1>Events</h1>
      </Landing>
      <div className="sec-default intro">
        <p>
          Here there can be a paragraph about the kinds of events NF Wine runs and the kind of community they hope to foster.
        </p>
      </div>
      <EventBox className="sec-default">
        <h2>Upcoming Events</h2>
        {renderEvents('upcoming')}
      </EventBox>
      <EventBox className="sec-default">
        <h2>Past Events</h2>
        {renderEvents('past')}
      </EventBox>
    </Container>
  )
}