import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

//-----< Component Imports >-----\\
import InputDetails from './ItemInputDetails';
import BackButton from '../../GenUse/BackButton/BackButton';

//Turns the route in the url into a useful words for placeholders
const typeName = {
  events: 'Event',
  producers: 'Producer',
  suppliers: 'Supplier'
}

function startState (params,edit) {
  console.log('Edit info:',edit);
  
  this.type = params.type || '';
  this.action = params.action || '';

  this.name = (params.action==='edit')? edit.name || '' : '';
  this.description = edit.description || '';
  this.img = edit.img || '';

  switch(params.type) {
    case 'events':
      this.date = edit.date || '';
      this.time = edit.time || '';
      this.price = edit.price || '';
      break;
    case 'producers':
    case 'suppliers':
      this.country = edit.country || 'Select a country';
      this.region = edit.region || 'Select a region';
      this.website = edit.website || '';
      break;
    default:
  }
}

class EventNew extends Component {
  
  state = new startState(this.props.match.params,this.props.edit);  

  //Fill the page h1 with text depending on the current focus.
  titleText = ()=> {
    const current = this.state.type+this.state.action;

    switch(current) {
      case 'eventsnew': return 'Create New Event';
      case 'eventsedit': return 'Edit Event';

      case 'producersnew': return 'Add New Producer';
      case 'producersedit': return 'Edit Producer';

      case 'suppliersnew': return 'Add New Supplier';
      case 'suppliersedit': return 'Edit Supplier';
      
      default: return '';
    }
  }

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
    let newItem = this.state;
    console.log('New Items:',newItem);
    let route = `/${this.state.type}`;
    console.log('Server route:',route);
    

    //Making a post request to the server
    axios.post(route,newItem).then(response=>{
      alert(`${typeName[this.state.type]} added!`);
      //this.returnToEventLanding();
    }).catch(error=>{
      alert('Unable to create an event right now. Try again later.')
      console.log(error);
    })
  }

  returnToEventLanding = ()=> {
    this.props.history.push('/manager/events');
  }

  render () {
    return (
      <div>
        {JSON.stringify(this.state)}
        <div>
          <h1>{this.titleText()}</h1>
          <BackButton text='Back' propClass='button-default' />
        </div> 
        {JSON.stringify(this.props.edit)}
        
        <form className="inputBox" onSubmit={this.handleSubmit}>
          <div className="in-image"></div>
          <InputDetails details={this.state} type={this.state.type} handleChange={this.handleChange}/>
          <input required className="in-name" type="text" placeholder={`${typeName[this.props.match.params.type]} Name`} value={this.state.name} onChange={(event)=>this.handleChange(event,'name')} />
          <textarea required className="in-description" placeholder={`${typeName[this.props.match.params.type]} Description`}  value={this.state.description} onChange={(event)=>this.handleChange(event,'description')}/>
          <button className="inputButton button-secondary center-block">Submit</button>
        </form>       
      </div>
    )
  }
}

export default withRouter(connect(state=>({edit: state.editReducer.editInfo}))(EventNew));