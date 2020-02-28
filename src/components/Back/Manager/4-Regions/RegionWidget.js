import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px dotted #DDD;
  display: grid;
  grid-template-areas: "info buttons";
  grid-template-columns: 1fr auto; 
  padding: 4px;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  grid-area: buttons;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  button {
    margin-left: 4px;
  }
`;

const InfoBox = styled.div`
  grid-area: info;
`;

export default function RegionWidget(props) {

  const {id, name, region_code, country_id} = props.region;

  return (
    <Container>

      <InfoBox>
        <p>{name} - {region_code} </p>
      </InfoBox>

      <ButtonBox>
        <button className="button-default">Edit</button>
        <button className="button-primary">Delete</button>
      </ButtonBox>

    </Container>
  )
}