import React from 'react';
import styled from 'styled-components';

import WorldMap from './WorldMap';

const Container = styled.div`

`;

const Landing = styled.div`
  padding: 128px 16px;
`;

const MapBox = styled.div`
  display: grid;
  grid-template-areas: "map list";
  grid-template-columns: 1fr auto;
  padding: 0 10%;
`;

const MapList = styled.div`
  background-color: yellow;
  width: 250px;
  height: 400px;
`;

export default function Partners() {

  return (
    <Container>

      <Landing>
        <h1>Producers</h1>
        <p>Insert a paragraph about the the qualities of the producers you work with.</p>
      </Landing>

      <MapBox>

        <WorldMap />
        <MapList>

        </MapList>
      </MapBox>
    </Container>
  )
}