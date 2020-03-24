import React from 'react';
import styled from 'styled-components';

const Container = styled.tr`

`;

export default function ProducerItem(props) {
  return (
    <Container>
      <td>{props.producer.name}</td>
      <td>{props.producer.country_name}</td>
      <td>{props.producer.region_name}</td>
      <td><button>Details</button></td>
    </Container>
  )
}