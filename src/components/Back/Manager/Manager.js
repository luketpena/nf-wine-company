import React from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import { Route } from 'react-router-dom';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import ManagerMenu from './ManagerMenu';

import EventLanding from './0-Events/EventLanding';
import SupplierLanding from './1-Suppliers/SupplierLanding';
import AccountLanding from './3-Accounts/AccountLanding';

import EventInput from './0-Events/EventInput';
import SupplierInput from './1-Suppliers/SupplierInput';

import ModifyAccounts from './3-Accounts/ModifyAccounts';

import ManagerBar from './ManagerBar';

import barrels from '../../../images/bkg-barrels.jpg';


//-----< Styling >-----\\
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-image: url(${barrels});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

`;

//-----< Component Function >-----\\
export default function Manager (props) {
  

  function renderBar() {
    if (props.location.pathname!=='/manager') {
      return <ManagerBar />
    }
  }
  
  return (
    <Container>
        {renderBar()}
        <Switch>
          <Route exact path="/manager" component={ManagerMenu}/>

          <Route exact path="/manager/events" component={EventLanding} />
          <Route exact path="/manager/suppliers" component={SupplierLanding} />
          <Route exact path="/manager/accounts" component={AccountLanding} />

          <Route exact path="/manager/accounts/modify" component={ModifyAccounts} />
          
          <Route path="/manager/events/:action" component={EventInput} />
          <Route path="/manager/suppliers/:action" component={SupplierInput} />
        </Switch>
    </Container>
  )
}