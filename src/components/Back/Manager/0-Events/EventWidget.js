import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import {connect} from 'react-redux';


//, img from the extraction of props.event
class EventWidget extends Component {

  clickEdit = ()=> {
    this.props.dispatch({type: 'SET_EDIT', payload: this.props.event})
  }

  clickDelete = (id)=> {
    this.props.dispatch({type: 'DELETE_EVENT', payload: {id}})
  }

  render () {

    let {name, description, date, time, price, id} = this.props.event;   

    return (
      <div className="eventWidget">
        <div className="eventWidget-img"></div>
        <div>
          <h3>{name}</h3>
          <ul>
            <li>{date.split('T')[0]}</li>
            <li>{time.substr(0,5)}</li>
            <li>${price}</li>
          </ul>
          <p>{description}</p>
        </div>
        <div>
          <TravelButton target={`events/update/edit`} text="Edit" propClass='button-default' clickAction={this.clickEdit}/>
          <button className="button-primary" onClick={()=>this.clickDelete(id)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default connect()(EventWidget);