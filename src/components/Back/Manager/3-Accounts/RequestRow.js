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
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px -2px rgba(0,0,0,.25);
  border-radius: 8px;
  margin: 8px 0;
  padding: 8px;

  p, button {
    display: block;
    margin: 4px 1%;
    text-align: center;
  }

  button {
    width: 100%;
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
            <ModalButton className="button-back-static" onClick={approve}>Send</ModalButton>
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
      default: return <></>
    }
  }

  function clickReject() {
    setModalSelect('confirm reject');  
  }
  
  function clickApprove() {    
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

  function approve() {
    const requestPackage = {
      request: props.request,
      account_id: props.selectedAccount.id
    }
    dispatch({type: 'APPROVE_ACCESS_REQUEST', payload: requestPackage});
    setModalSelect('');
  }
  
  return (
    <Container>

      <Content>
        <p>{name}</p>
        <p>{email}</p>
        <p>{company}</p>
        <div>
          <button className="button-back-static" onClick={clickApprove}>Approve</button>
          <button className="button-back-static-negative" onClick={clickReject}>Reject</button>
        </div>
      </Content>

      <Modal open={(modalSelect!=='')} handleClose={()=>setModalSelect('')}>
        {renderModal()}
      </Modal>

    </Container>
  )
}