import React, {Component} from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import {Route} from 'react-router-dom';

//>> Importing Page Components <<\\
import ManagerMenu from './ManagerMenu';
import ManagerEvents from './0-Events/ManagerEvents';
import EventNew from './0-Events/EventNew';
import EventEdit from './0-Events/EventEdit';
import ProducerNew from './2-Producers/ProducerNew';

class Manager extends Component {
  render () {
    return (
      <div className="managerBox">
          <Switch>
            <Route exact path="/manager" component={ManagerMenu}/>
            <Route exact path="/manager/events" component={ManagerEvents}/>
            <Route exact path="/manager/events/new" component={EventNew} />
            <Route path="/manager/events/edit" component={EventEdit} />

            <Route exact path="/manager/producers/new" component={ProducerNew} />

          </Switch>
      </div>
    )
  }
}

export default Manager;