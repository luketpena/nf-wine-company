import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

const Container = styled.tr`
  
`;

export default function AccountRow(props) {

  const dispatch = useDispatch();

  function removeAccount() {
    dispatch({type: 'DELETE_USER', payload: props.account.id});
  }

  return (
    <Container>
      <td>{props.account.username}</td>
      <td>{props.account.email}</td>
      <td>{props.account.access}</td>
      <td>{(props.account.access==='customer'? <button className="button-back-static">Modify</button> : <>&nbsp;</> )}</td>
      <td>{(props.account.access!=='master'? <button className="button-back-static-negative" onClick={removeAccount}>Remove</button> : <>&nbsp;</> )}</td>
    </Container>
  )
}