import React from 'react';
import styled from 'styled-components';

import AccountInfo from './AccountInfo';
import AccountUser from './AccountUser';
import AccountRequest from './AccountRequest';

const Container = styled.div`
  display: grid;
  grid-template-areas: "info request" "user request";
  grid-template-columns: 250px 1fr;
`;

export default function AccountLanding() {
  return (
    <Container>
      
      <AccountInfo />
      <AccountUser />
      <AccountRequest />
    </Container>
  )
}