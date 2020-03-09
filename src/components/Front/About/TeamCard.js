import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 8px;
  p, h3 {
    text-indent: 0;
    margin: 0 auto;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

export default function TeamCard(props) {
  return (
    <Container>
      <img
        src={(props.person.img? props.person.img : 'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg')}
        alt={props.person.name}
      />
      <h3>{props.person.name}</h3>
      <p>{props.person.role}</p>
    </Container>
  )
}