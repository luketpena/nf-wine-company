import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

export default function ProducerCard(props) {

  const {name, country_name, region_name, website_url} = props.producer;

  return (
    <Container>
      <h3>{props.producer.name}</h3>
      <p>
        {(country_name? <span>{country_name}</span> : <></>)}
        {(country_name && region_name? <span>-</span> : <></>)}
        {(region_name? <span>{region_name}</span> : <></>)}
      </p>
      <button className="button-front">Details</button>
    </Container>
  )
}