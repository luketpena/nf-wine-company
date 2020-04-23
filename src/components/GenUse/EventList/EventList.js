import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

//-----< Component Imports >-----\\
import EventItem from './EventItem';

//-----< Styling >-----\\
const Container = styled.div`
  .no-events {
    text-align: center;
  }

  h2 {
    font-size: 2em;
    margin-top: 0;
  }
`;

//-----< Component Function >-----\\
export default function EventList(props) {

  const events = useSelector(state=>state.event);
  let [upcomingList, setUpcomingList] = useState([]);
  let [pastList, setPastList] = useState([]);

  useEffect(()=>{

    let dateNow = new Date();
    let pastCollection = [];
    let upcomingCollection = [];

    for (var event of events) {
      let eventDate = new Date(event.date);
      if (eventDate<dateNow) {
        pastCollection.push(event);
      } else {
        upcomingCollection.push(event);
      }
    }

    setUpcomingList(upcomingCollection);
    setPastList(pastCollection);
  },[setUpcomingList,setPastList,events]);


  function renderUpcomingEvents() {
    if (upcomingList.length>0) {
      return upcomingList.map( (item,i)=>{
        return <EventItem key={i} event={item} last={(events.length-1 === i)}/>
      });
    } else {
      return <p className="no-events">There are no upcoming events.</p>;
    }
  }

  function renderPastEvents() {
    return pastList.map( (item,i)=>{
      return <EventItem key={i} event={item} last={(events.length-1 === i)}/>
    });
  }

  function renderPastEventList() {
    if (pastList.length>0) {
      return (
        <div className="sec-default">
          <div className="sec-default-content">
            <h2>Past Events</h2>
            {renderPastEvents()}
          </div>
      </div>
      )
    }
  }

  return (
    <Container>
      <div className="sec-default">
        <div className="sec-default-content">
          <h2>Upcoming Events</h2>
          {renderUpcomingEvents()}
        </div>
      </div>
      {renderPastEventList()}
    </Container>
  )
}