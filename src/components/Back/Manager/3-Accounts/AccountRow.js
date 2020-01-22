import React from 'react';
import styled from 'styled-components';

const Container = styled.tr`
  background-color: red;
`;

export default function AccountRow(props) {

  return (
    <Container>
      <td>{props.account.username}</td>
      <td>{props.account.email}</td>
      <td>{props.account.access}</td>
      <td><button>Modify</button></td>
      <td>{(props.account.access!='master'? <button>Remove</button> : <>&nbsp;</> )}</td>
    </Container>
  )
}