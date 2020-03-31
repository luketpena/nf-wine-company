import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import Modal from '../../../GenUse/Modal/Modal';

const Container = styled.tr`
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
    }
  }

  function clickReject(id) {
    dispatch({type: 'REMOVE_REQUEST', payload: id})
  }
  
  function clickApprove(payload) {
    console.log('CLICk');
    
    if (props.account) {
      dispatch({type: 'APPROVE_ACCESS_REQUEST', payload});
    } else {
      setModalSelect('select account');
    }
  }
  
  return (
    <Container>
      <td>{name}</td>
      <td>{email}</td>
      <td>{company}</td>
      <td><button className="button-back-static" onClick={clickApprove}>Approve</button></td>
      <td><button className="button-back-static-negative" onClick={clickReject}>Reject</button></td>

      <Modal open={(modalSelect!=='')} handleClose={()=>setModalSelect('')}>
        {renderModal()}
      </Modal>

    </Container>
  )
}