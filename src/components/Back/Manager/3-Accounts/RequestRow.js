import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

const Container = styled.tr`
  background-color: orange;
`;

export default function RequestRow(props) {

  const dispatch = useDispatch();
  const {name, email, note, id} = props.request;

  function clickReject() {
    dispatch({type: 'REJECT_ACCESS_REQUEST', payload: id})
  }

  
  return (
    <Container>
      <td>{name}</td>
      <td>{email}</td>
      <td>{note}</td>
      <td><button>Approve</button></td>
      <td><button onClick={clickReject}>Reject</button></td>
    </Container>
  )
}