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

/*-----< Title Info >-----*/
const titleText = [
  `Not to toot our own horn, but we have some of the best wine events in Minnesota for our customers and consumers! Whether it's off-site at a restaurant, event space or in the brand new loft space of our warehouse, our staff deliver a truly worthwhile, educational (and fun!) experience.`,
  `In addition to our knowledgeable staff, our winery and supplier partners are able to enhance our offerings with seminars, staff trainings, online/webinar tastings and much more.`,
  `Reach out to us on our contact page to get up to date information on upcoming tastings, events and exclusive wine deals`
];


//-----< Component Function >-----\\
export default function Events() {

  return (
    <Container>
      <FrontLanding 
        title="Events" 
        text={titleText}/>
      <EventList />
    </Container>
  )
}