import React from 'react';
import styled from 'styled-components';
import {faFacebookSquare, faInstagramSquare} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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

const IconTray = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;

  .icon {
    margin: 0 8px;
    font-size: 32px;
    color: white;
    text-decoration: none;
  }
`;

export default function Footer() {
  return (
    <Container>
      <p>Copyright © {new Date().getFullYear()} New France Wine Company. All rights reserved.</p>
      <IconTray>
        <a>
          <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
        </a>
        <a href="https://www.instagram.com/newfrancewine/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className="icon" icon={faInstagramSquare} />
        </a>
      </IconTray>
    </Container>
  )
}