import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

//-----< Component Imports >-----\\
import BackButton from '../../../GenUse/BackButton/BackButton';

//Turns the route in the url into a useful words for placeholders
const typeName = {
  events: 'Event',
  producers: 'Producer',
  suppliers: 'Supplier'
}

function startState (params,edit) { 
  this.action = params.action || '';
  this.name = (params.action==='edit')? edit.name || '' : '';
  this.description = (params.action==='edit')? edit.description || '' : '';
  this.img = (params.action==='edit')? edit.img || '' : '';
  this.date = (params.action==='edit')? edit.date || '' : '';
  this.time = (params.action==='edit')? edit.time || '' : '';
  this.price = (params.action==='edit')? edit.price || '' : '';
}

class EventNew extends Component {
  
  state = new startState(this.props.match.params,this.props.edit);  

  //Handles input changes updating state
  handleChange = (event,prop)=> {
    this.setState({
      [prop]: event.target.value
    });
  }

  //Handles submission of the data to the server
  handleSubmit = (event)=> {
    //Set up
    event.preventDefault();
    //Making a post request to the server
    axios.post('/events',this.state).then(response=>{
      alert(`${typeName[this.state.type]} added!`);
    }).catch(error=>{
      alert('Unable to create an event right now. Try again later.')
      console.log(error);
    })
  }

  render () {
    return (
      <div>
        {JSON.stringify(this.state)}
        <div>
          <h1>{(this.props.match.params.action==='edit')? 'Edit Event' : 'Create New Event'}</h1>
          <BackButton text='Back' propClass='button-default' />
        </div> 
        {JSON.stringify(this.props.edit)}
        
        <form className="inputBox" onSubmit={this.handleSubmit}>

          <div className="in-image"></div>

          <input required className="in-name" type="text" placeholder="Event Name" value={this.state.name} onChange={(event)=>this.handleChange(event,'name')} />
  
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

          <textarea required className="in-description" placeholder="Event Description"  value={this.state.description} onChange={(event)=>this.handleChange(event,'description')}/>
          
          <button className="inputButton button-secondary center-block">Submit</button>

        </form>       
      </div>
    )
  }
}

export default withRouter(connect(state=>({edit: state.editReducer.editInfo}))(EventNew));