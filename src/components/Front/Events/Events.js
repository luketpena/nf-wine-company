import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import FrontLanding from '../FrontLanding';
import EventList from '../../GenUse/EventList/EventList';

//-----< Styling >-----\\
const Container = styled.div`
  .intro {
    text-align: center;
  }
`;

//-----< Component Function >-----\\
export default function Events() {

  return (
    <Container>
      <FrontLanding 
        title="Events" 
        text="Here there can be a paragraph about the kinds of events NF Wine runs and the kind of community they hope to foster."/>

      <EventList />
    </Container>
  )
}