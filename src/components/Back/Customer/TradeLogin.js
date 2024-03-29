import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import FrontLanding from '../../Front/FrontLanding';
import Modal from '../../GenUse/Modal/Modal';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mode-button {
    margin: 32px auto;
  }
`;

const Form = styled.form`
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

  const dispatch = useDispatch();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [company, setCompany] = useState('');
  let [mode, setMode] = useState('login');

  let [modalOpen, setModalOpen] = useState(false);

  function login(event) {
    event.preventDefault();

    if (username && password) {
      dispatch({type: 'GET_EVENTS_PUBLIC'})
      console.log('LOGIN on page');
      
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  function submitRequest(event) {
    event.preventDefault();
    const newRequest = {name, email, company};
    dispatch({ type: 'SUBMIT_REQUEST', payload: newRequest});

    setModalOpen(true);
    setName('');
    setEmail('');
    setCompany('');
  }

  function renderForm() {
    switch(mode) {
      case 'login':
        return (
          <Form onSubmit={event=>login(event)}>
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
          </Form>
        )
      case 'request':
        return (
          <Form onSubmit={event=>submitRequest(event)}>
            <input
              required
              type="text"
              value={name}
              onChange={event=>setName(event.target.value)}
              placeholder="Your name"/>
            <input
              required
              type="email"
              value={email}
              onChange={event=>setEmail(event.target.value)}
              placeholder="youremail@place.com"/>
            <input
              required
              type="text"
              value={company}
              onChange={event=>setCompany(event.target.value)}
              placeholder="Your company"/>
            <button className="button-secondary">Submit Request</button>
          </Form>
        )
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

      <Modal open={modalOpen} handleClose={()=>setModalOpen(false)}>
        <p>Your request has been sent. If approved, you will receive your account information via email.</p>
      </Modal>
    </Container>
  )
}