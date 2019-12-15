import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class ManagerMenu extends Component {

  //This will eventually switch between different manager pages depending on the button
  clickMenuItem = ()=> {
    console.log('CLICK');
    this.props.history.push('/manager/events')
  }

  render () {
    return (
      <div>
        <h1>Manager</h1>
        <div className="managerMenuBox">
          <div className="managerMenuBox">
            <div className="managerMenuItem" onClick={this.clickMenuItem}> <h2>Events</h2> </div>
            <div className="managerMenuItem"> <h2>Suppliers</h2> </div>
          </div>
          <div className="managerMenuBox">
            <div className="managerMenuItem"> <h2>Producers</h2> </div>
            <div className="managerMenuItem"> <h2>Customers</h2> </div>     
          </div>     
        </div>
        
      </div>
    )
  }
}

export default withRouter(ManagerMenu);