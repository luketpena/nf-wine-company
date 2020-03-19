import React from 'react';
import styled from 'styled-components';

import EventItem from './EventItem';

const Container = styled.div`

`;

const EventBox = styled.div`

`;

const eventList = [
  {
    name: 'event 1',
    date: '03/30/2020',
    location: 'My place',
    time: '17:00'
  },
  {
    name: 'event 2',
    date: '03/30/2020',
    location: 'My place',
    time: '17:00'
  }
]

export default function Events() {

  function renderEvents(array) {
    if (array.length>0) {
      return eventList.map( (item,i)=>{
        return <EventItem key={i} event={item}/>
      })
    } else {
      return (
        <p>There are currently no upcoming events.</p>
      )
    }
  }

  return (
    <Container>
      <h1>Events</h1>
      <EventBox className="sec-default">
        {renderEvents(eventList)}
      </EventBox>
    </Container>
  )
}