import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import Modal from '../../../GenUse/Modal/Modal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const ModalBox = styled.div`
  display: absolute;
  background-color: red;
`;

const InfoBox = styled.div`
  width: 20%;
  min-height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted #DDD;
`;

export default function AccountRow(props) {

  const dispatch = useDispatch();

  function removeAccount() {
    dispatch({type: 'DELETE_USER', payload: props.account.id});
  }

  return (
    <Container>
      <InfoBox>{props.account.username}</InfoBox>
      <InfoBox>{props.account.email}</InfoBox>
      <InfoBox>{props.account.access}</InfoBox>
      <InfoBox>{(props.account.access==='customer'? <button className="button-back-static">Modify</button> : <>&nbsp;</> )}</InfoBox>
      <InfoBox>{(props.account.access!=='master'? <button className="button-back-static-negative" onClick={removeAccount}>Remove</button> : <>&nbsp;</> )}</InfoBox>
    </Container>
  )
}