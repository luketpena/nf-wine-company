import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import axios from 'axios';
import EventWidget from './EventWidget';

import {connect} from 'react-redux';

class EventLanding extends Component {

  state = {
    events: []
  }

  //Push those events into the state
  storeEvents = (array)=> {
    this.setState({
      events: [...array]
    })
  }
  //Render all upcoming events in state to the DOM
  renderUpcomingEvents = ()=> {
    //Get today's date
    let dateNow = new Date();
    let events = this.props.events.map( (event,i) => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it is ahead of today
      if (eventDate>dateNow) {
        return <EventWidget key={event.id} event={event} index={i}/>
      }
      return false;
    });
    return events;
  }

  //Render all upcoming events in state to the DOM
  renderPastEvents = ()=> {
    //Get today's date
    let dateNow = new Date();
    let events = this.props.events.map( (event,i) => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it is ahead of today
      if (eventDate<dateNow) {
        return <EventWidget key={event.id} event={event} index={i}/>
      }
      return false;
    });
    return events;
  }

  render () {
    return (
      <div id="eventLandingBox">
        <h1>Events</h1>
        <TravelButton target="/manager" text="Back" propClass='button-default'/>
        <section className="section-box">
          <TravelButton target="/manager/events/update/new" text="Create New Event" propClass="button-secondary center-block"/>
        </section>
        <section className="section-box">
          <h2>Upcoming Events</h2>
          {this.renderUpcomingEvents()}
        </section>
        <section className="section-box">
          <h2>Past Events</h2>
          {this.renderPastEvents()}
        </section>
      </div>
    )
  }
}

export default connect(reduxState=>({events: reduxState.eventReducer}))(EventLanding);