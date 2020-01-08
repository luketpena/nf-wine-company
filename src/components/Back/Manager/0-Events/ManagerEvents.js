import React, {Component} from 'react';
import EventLanding from './EventLanding';

/*
Inputs for events:
  - title
  - date
  - time start / end
  - description
  - photo
  - admission
  - public / trade partner
*/

class ManagerEvents extends Component {
  render () {
    return (
      <div className="managerApp">
        <EventLanding />
      </div>
    )
  }
}

export default ManagerEvents;