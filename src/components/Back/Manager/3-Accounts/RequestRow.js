import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import Modal from '../../../GenUse/Modal/Modal';

const Container = styled.div``;

const ModalButton = styled.button`
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  box-shadow: 0 4px 4px -2px rgba(0,0,0,.25);
  border-radius: 8px;
  margin: 8px 0;

  p, button {
    display: block;
    margin: 4px 1%;
    width: 18%;
    text-align: center;
  }
`;


export default function RequestRow(props) {

  const dispatch = useDispatch();
  const {name, email, company, id} = props.request;
  let [modalSelect, setModalSelect] = useState('');
  

  function renderModal() {
    switch(modalSelect) {
      case 'select account':
        return (
          <p>Please select an account to provide to this trade partner.</p>
        )
      case 'confirm approve':
        return (
          <div>
            <p>Send the account details for {props.selectedAccount.username} to {name}?</p>
            <ModalButton className="button-back-static">Send</ModalButton>
            <ModalButton className="button-back-static-negative" onClick={()=>setModalSelect('')}>Cancel</ModalButton>
          </div>
        )
      case 'confirm reject':
        return (
          <div>
            <p>Reject access to {name} from {company}?</p>
            <ModalButton className="button-back-static" onClick={reject}>Confirm</ModalButton>
            <ModalButton className="button-back-static-negative" onClick={()=>setModalSelect('')}>Cancel</ModalButton>
          </div>
        )
    }//dispatch({type: 'APPROVE_ACCESS_REQUEST', payload});
  }

  function clickReject() {
    setModalSelect('confirm reject');  
  }
  
  function clickApprove(payload) {    
    if (props.selectedAccount) {
      setModalSelect('confirm approve')
    } else {
      setModalSelect('select account');
    }
  }

  function reject() {
    dispatch({type: 'REMOVE_REQUEST', payload: id})
    setModalSelect('');
  }
  
  return (
    <Container>

      <Content>
        <p>{name}</p>
        <p>{email}</p>
        <p>{company}</p>
        <button className="button-back-static" onClick={clickApprove}>Approve</button>
        <button className="button-back-static-negative" onClick={clickReject}>Reject</button>
      </Content>

      <Modal open={(modalSelect!=='')} handleClose={()=>setModalSelect('')}>
        {renderModal()}
      </Modal>

    </Container>
  )
}