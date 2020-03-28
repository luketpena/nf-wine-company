import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

const Container = styled.tr`
`;

export default function RequestRow(props) {

  const dispatch = useDispatch();
  const {name, email, note, id} = props.request;

  function clickReject() {
    dispatch({type: 'REMOVE_REQUEST', payload: id})
  }
  
  function clickApprove() {
    dispatch({type: 'APPROVE_ACCESS_REQUEST', payload: {
      id,
      name,
      email
    }})
  }
  
  return (
    <Container>
      <td>{name}</td>
      <td>{email}</td>
      <td>{note}</td>
      <td><button className="button-back-static" onClick={clickApprove}>Approve</button></td>
      <td><button className="button-back-static-negative" onClick={clickReject}>Reject</button></td>
    </Container>
  )
}