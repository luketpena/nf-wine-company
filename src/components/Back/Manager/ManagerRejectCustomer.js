import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import LogOutButton from '../../LogOutButton/LogOutButton';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .contentHouse {
    height: max-content;
  }

  .contentBox {
    max-width: 700px;
  }

  button {
    background-color: var(--col-primary);
    color: white;
    border: none;
    outline: none;
    padding: 16px 48px;
    font-size: 1em;
    border-radius: 16px;
    transition: padding .2s;
    cursor: pointer;
    &:hover {
      padding: 16px 64px;
    }
  }
`;

export default function ManagerRejectCustomer() {

  const dispatch = useDispatch();

  return (
    <Container>
      <div className="sec-default contentHouse">
        <div className="sec-default-content">
          <div className="contentBox">
            <p>The account you are currently logged into has customer-level access only. Please log out and try again with an account that has admin level access.</p>
            <LogOutButton/>
          </div>
        </div>
      </div>  
    </Container>
  )
}