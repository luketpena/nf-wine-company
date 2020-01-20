import React from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import { Route } from 'react-router-dom';

//-----< Component Imports >-----\\
import ManagerMenu from './ManagerMenu';
import EventLanding from './0-Events/EventLanding';
import SupplierLanding from './1-Suppliers/SupplierLanding';
import EventInput from './0-Events/EventInput';

//-----< Component Function >-----\\
export default function Manager () {
  return (
    <div className="managerBox">
        <Switch>
          <Route exact path="/manager" component={ManagerMenu}/>
          <Route exact path="/manager/events" component={EventLanding} />
          <Route exact path="/manager/suppliers" component={SupplierLanding} />
          <Route path="/manager/events/update/:action" component={EventInput} />
        </Switch>
    </div>
  )
}