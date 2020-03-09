import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';

import Home from './1-Home/Home';
import Menu from './0-Menu/Menu';


const Container = styled.div`

`;

export default function Public() {
  return (
    <Container>
      <Menu/>
      <Switch>
        
        <Route exact path="/" component={Home}/>
      </Switch>
    </Container>
  )
}