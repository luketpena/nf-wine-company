import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import LoginErrorBar from './LoginErrorBar';
import LoginInput from './LoginInput';

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
  padding: 64px;
`;

const Box = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
`;

const SwitchButton = styled.button`
  width: 128px;
  margin-top: 64px;
`;

export default function RegisterPage() {

  const dispatch = useDispatch();
  let errors = useSelector(state=>state.errors);
  let loginMode = useSelector(state=>state.loginMode);
  

  function renderSwitchButton() {
    if (loginMode==='login') {
      return <SwitchButton
      type="button"
      className="link-button"
      onClick={() => {
        dispatch({type: 'SET_TO_REGISTER_MODE'});
        dispatch({type: 'CLEAR_LOGIN_ERROR'});
      }}
    >
      Register
    </SwitchButton>
    } else {
      return <SwitchButton
      type="button"
      className="link-button"
      onClick={() => {
        dispatch({type: 'SET_TO_LOGIN_MODE'})
        dispatch({type: 'CLEAR_REGISTRATION_ERROR'})
      }}
    >
      Login
    </SwitchButton>
    }
  }

  function renderErrorBar() {
    if (errors.registrationMessage || errors.loginMessage) {
      return <LoginErrorBar />
    }
  }

  return (
    <Container>
      
      <Box loginMode={loginMode}>
        <InputBox>
          {renderErrorBar()}

          <h1 className="logReg-title">Login</h1>
          <LoginInput />
        </InputBox>
      </Box>
    </Container>
  );
}
