import React from 'react';
import styled from 'styled-components';

import AccountInfo from './AccountInfo';
import AccountUser from './AccountUser';
import AccountRequest from './AccountRequest';

import ManagerTitle from '../ManagerTitle';

const Container = styled.div`
  
`;

const AccountBox = styled.div`
  display: grid;
  grid-template-areas: "info request" "user request";
  grid-template-columns: 250px 1fr;

  @media (max-width: 900px) {
    grid-template-areas: "info user" "request request";
    grid-template-columns: 250px 250px;
    justify-content: center;
  }
`;

export default function AccountLanding() {
  return (
    <Container className="landingBox">
      <ManagerTitle title="Accounts" target="/manager"/>
      <AccountBox className="section-box">
        <AccountInfo />
        <AccountUser />
        <AccountRequest />
      </AccountBox>
    </Container>
  )
}