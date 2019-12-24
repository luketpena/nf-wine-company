import React, {Component} from 'react';

class EventWidget extends Component {
  render () {

    let {name, description, img, date, time, price} = this.props.event;   

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
          <button className="button-default">Edit</button>
          <button className="button-primary">Delete</button>
        </div>
      </div>
    )
  }
}

export default EventWidget;