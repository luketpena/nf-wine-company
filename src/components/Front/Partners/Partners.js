import React from 'react';
import styled from 'styled-components';
import map from './worldmap.svg';

import WorldMap from './WorldMap';

const Container = styled.div`

`;

export default function Partners() {

  return (
    <Container>
      <svg src={map}/>
      <WorldMap />
    </Container>
  )
}