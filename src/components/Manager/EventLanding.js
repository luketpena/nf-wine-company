import React, {Component} from 'react';
import TravelButton from '../TravelButton/TravelButton';
import Axios from 'axios';
import EventWidget from './EventWidget';

class EventLanding extends Component {

  state = {
    events: []
  }

  //Retrieve events on mount
  componentDidMount() {
    this.getEvents();
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
  
  //Render all events in state to the DOM
  renderUpcomingEvents = ()=> {
    console.log(this.state.events);
    let events = this.state.events.map( event => {
      return <EventWidget key={event.id} event={event} />
    });
    return events;
  }

  render () {
    return (
      <div id="eventLandingBox">
        <TravelButton target="/manager" text="Back" propClass='manager-button'/>
        <h1>Events</h1>
        <section className="section-box">
          <TravelButton target="/manager/events/new" text="Create New Event" propClass="manager-button center-block"/>
        </section>
        <section className="section-box">
          <h2>Upcoming Events</h2>
          {this.renderUpcomingEvents()}
        </section>
        <section className="section-box">
          <h2>Past Events</h2>
        </section>
      </div>
    )
  }
}

export default EventLanding;