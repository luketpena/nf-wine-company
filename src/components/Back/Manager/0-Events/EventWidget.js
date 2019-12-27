import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';


//, img from the extraction of props.event
class EventWidget extends Component {

  clickEdit = ()=> {
    console.log('EDIT');
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
          <TravelButton target="/manager/events/edit" text="Edit" propClass='button-default'/>
          <button className="button-primary" onClick={()=>this.props.deleteEvent(id)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default EventWidget;