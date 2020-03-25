import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-shadow: 0 4px 16px -8px rgba(0,0,0,.5);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 16px;
  margin: 8px;

  text-align: center;
  h3 {
    border-bottom: solid 1px gray;
    font-family: var(--font-title);
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
    .divide {
      margin: 0 16px;
    }
  }
  
`;

export default function ProducerCard(props) {

  const {name, country_name, region_name, website_url} = props.producer;

  return (
    <Container>
      <h3>{props.producer.name}</h3>
      <p>
        {(country_name? <span>{country_name}</span> : <></>)}
        {(country_name && region_name? <span className="divide">-</span> : <></>)}
        {(region_name? <span>{region_name}</span> : <></>)}
      </p>
      <button className="button-front">Details</button>
    </Container>
  )
}