import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-color: rgba(0,0,0,.25);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const TextBox = styled.div`
  position: relative;
  z-index: 101;
  background-color: white;
  border-radius: 16px;
  width: 500px;
  height: 500px;
`;

export default function Modal(props) {

  function handleClose() {
    if (props.handleClose) {
      props.handleClose();
    }
  }

  function renderModal() {
    if (props.open) {
      return (
        <Container>
          <Background onClick={handleClose}/>
          <TextBox>
            {props.children}
          </TextBox>
        </Container>
      )
    }
  }

  return (
    <>
      {renderModal()}
    </>
  )
}