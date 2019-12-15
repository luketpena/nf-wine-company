import React, {Component} from 'react';

class EventWidget extends Component {
  render () {

    let {name, description, img, date, time, price} = this.props.event;
    console.log('DATE',date);
    

    return (
      <div className="eventWidget">
        <div className="eventWidget-img"></div>
        <div>
          <h3>{name}</h3>
          <ul>
            <li>{date.split('T')[0]}</li>  <li>-</li>
            <li>{time.substr(0,5)}</li> <li>-</li>
            <li>${price}</li>
          </ul>
          <p>{description}</p>
        </div>
        <div>
          <button className="manager-button">Edit</button>
          <button className="manager-button">Delete</button>
        </div>
      </div>
    )
  }
}

export default EventWidget;