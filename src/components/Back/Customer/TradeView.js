import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import EventList from '../../GenUse/EventList/EventList';
import FrontLanding from '../../Front/FrontLanding';

const Container = styled.div`
  .button-box button {
    margin: 16px auto;
    display: block;
  }
`;


export default function TradeView() {

  const dispatch = useDispatch();

  const user = useSelector(state=>state.user);

  function logout() {
    dispatch({type: 'LOGOUT'});
  }

  return (
    <Container>
      <FrontLanding title={`Hello, ${user.username}`}/>
      <div className="button-box">
        <button className="button-secondary">Download pricing PDF</button>
        <button className="button-default" onClick={logout}>Logout</button>
      </div>
      <EventList/>
    </Container>
  )
}