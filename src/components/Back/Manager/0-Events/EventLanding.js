import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import Axios from 'axios';
import EventWidget from './EventWidget';

class EventLanding extends Component {

  state = {
    events: []
  }

  //Retrieve events on mount
  componentDidMount() {
    this.getEvents();
    let dateNow = new Date();
    let dateEvent = new Date('2020-01,03');
    console.log(dateEvent>dateNow);
    
  }
  //Get all of the events from the database
  getEvents = ()=> {
    Axios.get('/events').then(response=>{   
      this.storeEvents(response.data)
    }).catch(error=>{
      console.log(error);      
    });
  }
  //Push those events into the state
  storeEvents = (array)=> {
    this.setState({
      events: [...array]
    })
  }
  
  //Render all upcoming events in state to the DOM
  renderUpcomingEvents = ()=> {
    console.log(this.state.events);
    //Get today's date
    let dateNow = new Date();
    let events = this.state.events.map( event => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it is ahead of today
      if (eventDate>dateNow) {
        return <EventWidget key={event.id} event={event} />
      }
      return false;
    });
    return events;
  }

  //Render all upcoming events in state to the DOM
  renderPastEvents = ()=> {
    console.log(this.state.events);
    //Get today's date
    let dateNow = new Date();
    let events = this.state.events.map( event => {
      //Get the date of the event...
      let eventDate = new Date(event.date)
      //...and only render if it is ahead of today
      if (eventDate<dateNow) {
        return <EventWidget key={event.id} event={event} />
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
          <TravelButton target="/manager/events/new" text="Create New Event" propClass="button-secondary center-block"/>
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

export default EventLanding;