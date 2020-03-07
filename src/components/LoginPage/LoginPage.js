import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import LoginErrorBar from './LoginErrorBar';
import LoginInput from './LoginInput';

import barrels from '../../images/bkg-barrels.jpg';

const InputBox = styled.div`
  position: relative;
  overflow: hidden;
  grid-area: main;
  width: 100%;
  max-width: 512px;
  margin: 0 auto;
  border-radius: 16px;
  padding: 32px;
  background-color: #DDD;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${barrels});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

export default function RegisterPage() {

  let errors = useSelector(state=>state.errors);

  function renderErrorBar() {
    if (errors.registrationMessage || errors.loginMessage) {
      return <LoginErrorBar />
    }
  }

  return (
    <Container className="hello">
      <InputBox>
        {renderErrorBar()}
        <h1 className="logReg-title">Login</h1>
        <LoginInput />
      </InputBox>
    </Container>
  );
}
