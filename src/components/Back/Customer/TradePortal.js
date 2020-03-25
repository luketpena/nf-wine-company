import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

//-----< Resource Imports >-----\\
import background from './background.jpg';

//-----< Component Imports >-----\\
import TradeBackButton from './TradeBackButton';
import TradeLogin from './TradeLogin';
import TradeView from './TradeView';
import Footer from '../../GenUse/Footer/Footer';

//-----< Styling >-----\\
const Container = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  height: max-content;

  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default function TradePortal(props) {

  const dispatch = useDispatch();

  const user = useSelector(state=>state.user);

  useEffect(()=>{
    if (user.id) {
      dispatch({type: 'GET_EVENTS_TRADE'});
    }
  },[user]);

  function renderContent() {
    if (user.id) {
      return <TradeView />
    } else {
      return <TradeLogin />
    }
  }

  return (
    <Container>
      <TradeBackButton />
      {renderContent()}
      <Footer />
    </Container>
  )
}