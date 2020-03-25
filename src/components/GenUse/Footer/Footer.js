import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  background-color: var(--col-primary);
  color: white;
  padding: 16px;
  font-size: 1em;
  text-align: center;
  p {
    margin: 4px;
  }
`;

export default function Footer() {
  return (
    <Container>
      <p>Copyright © {new Date().getFullYear()} New France Wine Company. All rights reserved.</p>
    </Container>
  )
}