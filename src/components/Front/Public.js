import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';

/*-----< Resource Imports >-----*/
import background from './background.jpg';

/*-----< Component Imports >-----*/
import Menu from './Menu/Menu';
import Home from './Home/Home';
import About from './About/About';
import Events from './Events/Events';
import Contact from './Contact/Contact';
import Producers from './Producers/Producers';
import Suppliers from './Suppliers/Suppliers';
import Footer from '../GenUse/Footer/Footer';

/*-----< Styling >-----*/
const Container = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: -10;
  
  background-image: url(${background});
  background-position: center;
  background-size: cover;
`;

export default function Public() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'GET_EVENTS_PUBLIC'});
    dispatch({type: 'GET_COUNTRIES_FAVORITE'});
  },[dispatch]);

  return (
    <Container>
      <Menu/>

      <Background />

      <Content>
        <Switch>
          
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/events" component={Events}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/producers" component={Producers}/>}
          <Route exact path="/suppliers" component={Suppliers}/>}

        </Switch>

        <Footer/>
      </Content>
    </Container>
  )
}