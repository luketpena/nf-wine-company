import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: request;
  background-color: yellow;
`;

export default function AccountRequest() {

  return (
    <Container>
      <h2>Requests</h2>
    </Container>
  )
}