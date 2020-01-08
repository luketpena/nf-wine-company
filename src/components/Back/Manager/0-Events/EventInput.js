import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

//-----< Component Imports >-----\\
import BackButton from '../../../GenUse/BackButton/BackButton';

function startState (params,edit) {
  if (params.action==='edit' && edit.id) {
    this.id = edit.id;
  }
  this.name = (params.action==='edit' && edit.name)? edit.name : '';
  this.description = (params.action==='edit' && edit.description)? edit.description : '';
  this.img = (params.action==='edit' && edit.img)? edit.img : '';
  this.date = (params.action==='edit' && edit.date)? edit.date.split('T')[0] : '';
  this.time = (params.action==='edit' && edit.time)? edit.time : '';
  this.price = (params.action==='edit' && edit.price)? edit.price : '';
  
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
    event.preventDefault();
    switch(this.props.match.params.action) {
      case 'new':
        this.props.dispatch({type: 'NEW_EVENT', payload: this.state});
        break;
      case 'edit':
        this.props.dispatch({type: 'EDIT_EVENT', payload: this.state});
        break;
      default:
    }
    
    this.props.history.push('/manager/events')
  }

  render () {
    return (
      <div>
        <div>
          <h1>{(this.props.match.params.action==='edit')? 'Edit Event' : 'Create New Event'}</h1>
          <BackButton text='Back' propClass='button-default' />
        </div> 
        
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