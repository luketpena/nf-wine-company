import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class EventNew extends Component {

  state = {
    name: '',
    description: '',
    img: '',
    country: 'Select a country',
    region: 'Select a region',
    website: ''
  }

  handleChange = (event,prop)=> {
    this.setState({
      [prop]: event.target.value
    });
  }

  updateCountry = (event,prop)=> {
    this.handleChange(event,prop);
    this.props.dispatch({type: 'GET_REGIONS', payload: event.target.value});
    this.setState({
      region: 'Select a region'
    })
  }

  handleSubmit = (event)=> {
    //Set up
    event.preventDefault();
    let newEvent = this.state;

    //Making a post request to the server
    axios.post('/events',newEvent).then(response=>{
      alert('Event created!');
      this.returnToEventLanding();
    }).catch(error=>{
      alert('Unable to create an event right now. Try again later.')
      console.log(error);
      
    })
  }

  populateCountrySelect = ()=> {
    let list = this.props.countries.map( (country,i)=> {
      return <option key={i}>{country.name}</option>
    })
    return list;
  }

  populateRegionSelect = ()=> {
    let list = this.props.regions.map( (region,i)=> {
      return <option key={i}>{region.name}</option>
    })
    return list;
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
    this.props.dispatch({type: 'GET_COUNTRIES'})
  }

  render () {
    return (
      <div>
        {JSON.stringify(this.props.regions)}
        <h2>Add New Producer</h2>
        <TravelButton target="/manager/events" text="Back" propClass="manager-button"/>
        <div id="newEventBox">
          
          <div id="imageUpload"></div>
          <form id="eventInputBox" onSubmit={this.handleSubmit}>
            <input required id="in-producerName" type="text" placeholder="Producer Name" value={this.state.name} onChange={(event)=>this.handleChange(event,'name')}></input>
            <label>
              Country:
              <select onChange={(event)=>this.updateCountry(event,'country')} value={this.state.country}>
                <option disabled>Select a country</option>
                {this.populateCountrySelect()}
              </select>
            </label>
            <label>
              Region:
              <select onChange={(event)=>this.handleChange(event,'region')} value={this.state.region}>
                <option disabled>Select a region</option>
                {this.populateRegionSelect()}
              </select>
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

export default withRouter(connect(reduxState=>({
  countries: reduxState.placesReducer.countries,
  regions: reduxState.placesReducer.regions
}))(EventNew));