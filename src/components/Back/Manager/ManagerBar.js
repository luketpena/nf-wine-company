import React from 'react';
import styled from 'styled-components';
import LogOutButton from '../../LogOutButton/LogOutButton';
import {useHistory} from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: rgba(165,42,42,.5);
  display: grid;
  grid-template-areas: "nav control";
  grid-template-columns: 1fr auto;
  align-content: center;
  box-shadow: 0 -4px 8px 8px rgba(0,0,0,.5);
  h1 {
    color: white;

  }
`;

const NavBox = styled.div`
  grid-area: nav;
  li {
    display: inline;
    color: #CCC;
    margin-right: 16px;
    transition: color .2s;
    font-size: 1em;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
`;

const ControlBox = styled.div`
  grid-area: control;
  padding: 0 8px;
  display: flex;
  align-items: center;
  
  button {
    color: #CCC;
    margin-right: 16px;
    transition: color .2s;
    background: none;
    border: none;
    outline: none;
    font-size: 1em;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
`;

export default function ManagerBar(props) {
  
  
  const history = useHistory();

  function clickNav(target) {
    history.push(target);
  }
  
  return (
    <Container>
      <NavBox>
        <ul>
          <li></li>
          <li onClick={()=>clickNav('/manager/events')}>Events</li>
          <li onClick={()=>clickNav('/manager/suppliers')}>Suppliers</li>
          <li onClick={()=>clickNav('/manager/producers')}>Producers</li>
          <li onClick={()=>clickNav('/manager/accounts')}>Accounts</li>
        </ul>
      </NavBox>
      <ControlBox>
        <LogOutButton />
      </ControlBox>
    </Container>
  )
}