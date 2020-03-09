import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Container = styled.div`
  text-align: center;
  .icon {
    font-size: 8em;
  }
`;

export default function ProcessCard(props) {
  return (
    <Container>
      <FontAwesomeIcon className="icon" icon={props.process.icon}/>
      <h3>{props.process.name}</h3>
      <p>{props.process.text}</p>
    </Container>
  )
}