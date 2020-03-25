import React, {useState} from 'react';
import styled from 'styled-components';

import FrontLanding from '../../Front/FrontLanding';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mode-button {
    margin: 32px auto;
  }
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 16px;
  border-radius: 16px;

  input, button {
    display: block;
    margin: 32px auto;
    font-size: 1em;
    outline: none;
  }

  input {
    border: none;
    background-color: #EEE;
    padding: 8px;
    border-radius: 4px;
  }
`;

export default function TradeLogin() {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [mode, setMode] = useState('login');

  function renderForm() {
    switch(mode) {
      case 'login':
        return (
          <LoginForm>
            <input
              required
              type="text"
              value={username}
              placeholder="Username"
              onChange={event=>setUsername(event.target.value)}
              />
            <input
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={event=>setPassword(event.target.value)}
              />
            <button className="button-secondary">Login</button>
          </LoginForm>
        )
      case 'request':
        break;
      default: /* Keep React happy */ break;
    }
  }

  return (
    <Container>

      <FrontLanding title="Welcome to the Trade Portal"/>

      {renderForm()}

      <button 
        className="button-primary mode-button"
        onClick={()=>(mode==='login'? setMode('request') : setMode('login'))}>
          {(mode==='login'? 'Request Access' : 'Return to Login')}
      </button>
    </Container>
  )
}