import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import LoginInput from './LoginInput';

/* */
import barrels from '../../images/bkg-barrels.jpg';

import Modal from '../GenUse/Modal/Modal';

const InputBox = styled.div`
  position: relative;
  overflow: hidden;
  grid-area: main;
  width: max-content;
  max-width: 512px;
  margin: 0 auto;
  border-radius: 16px;
  padding: 32px;
  background-color: white;

  h1 {
    color: var(--col-primary);
    text-shadow: none;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${barrels});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const ErrorMessage = styled.p`
  font-size: 1.25em;
  text-align: center;
`;

export default function RegisterPage() {

  const dispatch = useDispatch();
  let errors = useSelector(state=>state.errors);

  return (
    <Container className="hello">
      <InputBox>
        <h1 className="logReg-title">Login</h1>
        <LoginInput />
      </InputBox>
      <Modal open={errors.loginMessage} handleClose={()=>dispatch({type: 'CLEAR_LOGIN_ERROR'})}>
        <ErrorMessage>{errors.loginMessage}</ErrorMessage>
      </Modal>
    </Container>
  );
}
