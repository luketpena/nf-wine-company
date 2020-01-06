import React, {Component} from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import {Route} from 'react-router-dom';

//>> Importing Page Components <<\\
import ManagerMenu from './ManagerMenu';
import ManagerEvents from './0-Events/ManagerEvents';
import NewItem from './NewItem';

class Manager extends Component {
  render () {
    return (
      <div className="managerBox">
          <Switch>
            <Route exact path="/manager" component={ManagerMenu}/>
            <Route exact path="/manager/events" component={ManagerEvents}/>

            <Route path="/manager/:type/update/:action" component={NewItem} />

          </Switch>
      </div>
    )
  }
}

export default Manager;