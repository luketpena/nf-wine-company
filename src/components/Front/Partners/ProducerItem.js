import React, {useState} from 'react';
import styled from 'styled-components';


const Container = styled.tr`

`;

export default function ProducerItem(props) {

  function handleClick() {
    console.log('My producer:',props.producer);
    
    props.setTargetProducer(props.producer);
    props.setOpen(true);
  }
 

  return (
    <Container>
      <td>{props.producer.name}</td>
      <td>{props.producer.country_name}</td>
      <td>{props.producer.region_name}</td>
      <td><button className="button-front" onClick={handleClick}>Details</button></td>

      
    </Container>
  )
}