import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';


import Menu from './Menu/Menu';
import Home from './Home/Home';
import About from './About/About';


const Container = styled.div`
  
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  background-color: purple;
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
          <Route exact path="/about" component={About}/>
        </Switch>

        <Footer>
          <p>Copyright © {new Date().getFullYear()} New France Wine Company. All rights reserved.</p>
        </Footer>
      </Content>
    </Container>
  )
}