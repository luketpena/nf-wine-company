import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 8px;

  max-width: 200px;

  p, h3 {
    margin: 0 auto;
    font-size: 1.2em;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    box-shadow: 0 0 16px 0 rgba(0,0,0,.25);
  }
`;

export default function TeamCard(props) {
  return (
    <Container>
      <img
        src={(props.person.photo? props.person.photo : 'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg')}
        alt={props.person.name}
      />
      <h3>{props.person.name}</h3>
      <p>{props.person.position}</p>
    </Container>
  )
}