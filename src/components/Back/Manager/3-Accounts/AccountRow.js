import React, {useState} from 'react';
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

  let [modifyActive, setModifyActive] = useState(false);
  let [newPassword, setNewPassword] = useState('');

  function removeAccount() {
    dispatch({type: 'DELETE_USER', payload: props.account.id});
  }

  function handleSubmit(event) {
     event.preventDefault();
     dispatch({type: 'UPDATE_CUSTOMER_PASSWORD', payload: {id: props.account.id, password: newPassword}});
     setNewPassword('');
  }

  return (
    <Container>
      <InfoBox>{props.account.username}</InfoBox>
      <InfoBox>{props.account.email}</InfoBox>
      <InfoBox>{props.account.access}</InfoBox>
      <InfoBox>{(props.account.access==='customer'? <button className="button-back-static" onClick={()=>setModifyActive(true)}>Modify</button> : <>&nbsp;</> )}</InfoBox>
      <InfoBox>{(props.account.access!=='master'? <button className="button-back-static-negative" onClick={removeAccount}>Remove</button> : <>&nbsp;</> )}</InfoBox>
      
      <Modal open={modifyActive} handleClose={()=>setModifyActive(false)}>
        <h3>{props.account.username}</h3>
        <p>Current password: <strong>{props.account.password_insecure}</strong></p>
        <form onSubmit={event=>handleSubmit(event)}>
          <input required type="text" placeholder="New Password" value={newPassword} onChange={event=>setNewPassword(event.target.value)}/>
          <button>Submit</button>
        </form>
      </Modal>
    </Container>
  )
}