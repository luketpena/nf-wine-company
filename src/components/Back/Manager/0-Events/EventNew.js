import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class EventNew extends Component {

  state = {
    name: '',
    description: '',
    img: '',
    date: '',
    time: '',
    price: '0'
  }

  handleChange = (event,prop)=> {
    this.setState({
      [prop]: event.target.value
    });
  }

  handleSubmit = (event)=> {
    //Set up
    event.preventDefault();
    let newEvent = this.state;

    //Making a post request to the server
    Axios.post('/events',newEvent).then(response=>{
      alert('Event created!');
      this.returnToEventLanding();
    }).catch(error=>{
      alert('Unable to create an event right now. Try again later.')
      console.log(error);
      
    })
  }

  returnToEventLanding = ()=> {
    this.props.history.push('/manager/events');
  }

  dummyData = ()=> {
    this.setState({
      name: 'Cool Event',
      date: '2019-12-03',
      time: '12:30:00',
      price: '5.50',
      description: 'This is a very cool event. Trust me.'
    });
  }

  render () {
    return (
      <div>

        <div className="inputTitle">
          <TravelButton target="/manager/events" text="Back" propClass="button-default"/>
          <h2>Create New Event</h2>
        </div> 

        <form className="inputBox" onSubmit={this.handleSubmit}>
          <div className="in-image"></div>
          <input required className="in-name" type="text" placeholder="Event Name" value={this.state.name} onChange={(event)=>this.handleChange(event,'name')}></input>
          <div className="inputLine">
            <label>
              <span className="inputName">Date:</span>
              <input required type="date" value={this.state.date} onChange={(event)=>this.handleChange(event,'date')}></input>
            </label>
            <label>
              <span className="inputName">Time:</span>
              <input required type="time" value={this.state.time} onChange={(event)=>this.handleChange(event,'time')}></input>
            </label>
            <label>
              <span className="inputName">$</span>
              <input required className="in-price" type="number" value={this.state.price} onChange={(event)=>this.handleChange(event,'price')}></input>
            </label>
          </div>
          <textarea required className="in-description" placeholder="Event Decription" value={this.state.description} onChange={(event)=>this.handleChange(event,'description')}/>
          <button className="inputButton button-secondary center-block">Create Event</button>
        </form>

          {/*<button onClick={this.dummyData}>Dummy Data</button>*/}
        
      </div>
    )
  }
}

export default withRouter(EventNew);