import React, {Component} from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import {Route} from 'react-router-dom';

//>> Importing Page Components <<\\
import ManagerMenu from './ManagerMenu';
import EventLanding from './0-Events/EventLanding';

import EventInput from './0-Events/EventInput';



class Manager extends Component {

  setEditInfo = (newEditInfo)=>{
    this.setState({editInfo: newEditInfo})
  }

  render () {
    return (
      <div className="managerBox">
          <Switch>
            <Route exact path="/manager" component={ManagerMenu}/>
            <Route exact path="/manager/events" component={EventLanding} />
            <Route path="/manager/events/update/:action" component={EventInput} />
          </Switch>
      </div>
    )
  }
}

export default Manager;