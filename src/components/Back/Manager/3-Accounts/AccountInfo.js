import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const Container = styled.div`
  grid-area: info;
  background-color: red;
  width: 250px;
  height: 250px;
  button {
    display: block;
    margin: 0 auto;
  }
`;
const Name = styled.p`
  text-align: center;
`;
const Email = styled.p`
  text-align: center;
`;
const Access = styled.p`
  text-align: center;
`;

export default function AccountInfo() {

  const user = useSelector(state=>state.user)

  return (
    <Container>
      <h2>Account Details</h2>
      <Name>{user.username}</Name>
      <Email>{user.email}</Email>
      <Access>Access: {user.access}</Access>
      <button>Update Settings</button>
    </Container>
  )
}