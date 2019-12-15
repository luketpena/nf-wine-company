import React, {Component} from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import {Route} from 'react-router-dom';

//>> Importing Page Components <<\\
import ManagerMenu from './ManagerMenu';
import ManagerEvents from './ManagerEvents';
import EventNew from './EventNew';

class Manager extends Component {
  render () {
    return (
      <div className="managerBox">
          <Switch>
            <Route exact path="/manager" component={ManagerMenu}/>
            <Route exact path="/manager/events" component={ManagerEvents}/>
            <Route exact path="/manager/events/new" component={EventNew} />
          </Switch>
      </div>
    )
  }
}

export default Manager;