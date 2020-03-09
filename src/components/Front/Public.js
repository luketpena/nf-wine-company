import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';

import Home from './1-Home/Home';
import Menu from './0-Menu/Menu';


const Container = styled.div`

`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const Footer = styled.footer`
  background-color: var(--col-primary);
  color: white;
  padding: 16px;
  font-size: 1em;
  text-align: center;
  p {
    margin: 4px;
  }
`;

export default function Public() {
  return (
    <Container>
      <Menu/>
      <Content>
        <Switch>
          
          <Route exact path="/" component={Home}/>
        </Switch>

        <Footer>
          <p>Copyright © {new Date().getFullYear()} New France Wine Company. All rights reserved.</p>
        </Footer>
      </Content>
    </Container>
  )
}