import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import EventList from '../../GenUse/EventList/EventList';
import FrontLanding from '../../Front/FrontLanding';

const Container = styled.div`
  button {
    margin: 16px auto;
    display: block;
  }
`;


export default function TradeView() {

  const user = useSelector(state=>state.user);

  return (
    <Container>
      <FrontLanding title={`Hello, ${user.username}`}/>
      <button className="button-secondary">Download pricing PDF</button>
      <EventList/>
    </Container>
  )
}