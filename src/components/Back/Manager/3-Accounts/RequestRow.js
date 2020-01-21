import React from 'react';
import styled from 'styled-components';

const Container = styled.tr`
  background-color: orange;
`;

export default function RequestRow(props) {

  const {name, email, note} = props.request;
  return (
    <Container>
      <td>{name}</td>
      <td>{email}</td>
      <td>{note}</td>
      <td><button>Approve</button></td>
      <td><button>Reject</button></td>
    </Container>
  )
}