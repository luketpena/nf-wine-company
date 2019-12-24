import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class EventNew extends Component {

  state = {
    name: '',
    description: '',
    img: '',
    country: '',
    region: '',
    website: ''
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

  componentDidMount () {
    Axios({
      "method":"GET",
      "url":"https://wft-geo-db.p.rapidapi.com/v1/geo/countries/FR/regions",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key":"1404608969msh64ce4d6ea908ecfp106397jsn8b9c3677b40e"
      }
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <h2>Add New Producer</h2>
        <TravelButton target="/manager/events" text="Back" propClass="manager-button"/>
        <div id="newEventBox">
          
          <div id="imageUpload"></div>
          <form id="eventInputBox" onSubmit={this.handleSubmit}>
            <input required id="in-producerName" type="text" placeholder="Producer Name" value={this.state.name} onChange={(event)=>this.handleChange(event,'name')}></input>
            <label>
              Country:
              <input required type="date" value={this.state.date} onChange={(event)=>this.handleChange(event,'date')}></input>
            </label>
            <label>
              Time:
              <input required type="time" value={this.state.time} onChange={(event)=>this.handleChange(event,'time')}></input>
            </label>
            <label>
              Admission price:
              <input required type="number" value={this.state.price} onChange={(event)=>this.handleChange(event,'price')}></input>
            </label>
            <textarea required id="in-description" placeholder="Event Decription" value={this.state.description} onChange={(event)=>this.handleChange(event,'description')}/>
            <button className="manager-button center-block">Create Event</button>
          </form>

          <button onClick={this.dummyData}>Dummy Data</button>
          
        </div>
      </div>
    )
  }
}

export default withRouter(EventNew);