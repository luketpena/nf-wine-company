import React from 'react';
import './Manager.css';
import { Switch } from 'react-router'; 
import { Route } from 'react-router-dom';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import ManagerMenu from './ManagerMenu';
import EventLanding from './0-Events/EventLanding';
import SupplierLanding from './1-Suppliers/SupplierLanding';
import EventInput from './0-Events/EventInput';
import SupplierInput from './1-Suppliers/SupplierInput';

//-----< Styling >-----\\
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: rgb(248, 245, 238);

  display: flex;
  align-items: center;
  justify-content: center;
`;

//-----< Component Function >-----\\
export default function Manager () {
  return (
    <Container>
        <Switch>
          <Route exact path="/manager" component={ManagerMenu}/>
          <Route exact path="/manager/events" component={EventLanding} />
          <Route exact path="/manager/suppliers" component={SupplierLanding} />
          
          <Route path="/manager/events/:action" component={EventInput} />
          <Route path="/manager/suppliers/:action" component={SupplierInput} />
        </Switch>
    </Container>
  )
}