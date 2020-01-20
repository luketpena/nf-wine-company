import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import EventWidget from './EventWidget';

import {connect} from 'react-redux';

class EventLanding extends Component {

  //Renders events to the DOM based on whether they are 'upcoming' or 'past' (stored in timing arg)
  renderEvents = (timing)=> {
    //Get today's date
    let dateNow = new Date();

    let events = this.props.events.map( (event,i) => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it meets requirements
      if ( (eventDate<dateNow && timing==='past') || (eventDate>dateNow && timing==='upcoming') ) {
        return <EventWidget key={event.id} event={event} index={i}/>
      }
      return false;
    });
    return events;
  }

  render () {
    return (
      <div className="landingBox">
        <h1>Events</h1>
        <TravelButton target="/manager" text="Back" propClass='button-default'/>
        <section className="section-box">
          <TravelButton target="/manager/events/update/new" text="Create New Event" propClass="button-secondary center-block"/>
        </section>
        <section className="section-box">
          <h2>Upcoming Events</h2>
          {this.renderEvents('upcoming')}
        </section>
        <section className="section-box">
          <h2>Past Events</h2>
          {this.renderEvents('past')}
        </section>
      </div>
    )
  }
}

export default connect(reduxState=>({events: reduxState.eventReducer}))(EventLanding);