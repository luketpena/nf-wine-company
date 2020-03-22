import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Landing from './Landing/Landing';

const Section = styled.section`
  
`;

const GoButton = styled.a`
  
`;



export default function Home() {

  const history = useHistory();

  function navigate(url) {
    history.push(url);
    window.scrollTo(0,0);
  }

  return (
    <main>
      <Landing/>

      <Section className="sec-default">
        <h2>Who We Are</h2>
        <p>We're a small company that specializes in niche producers who make great wine. New France Wine Company has been in Minnesota since 1990; previously, Robert Rudolph, owner and founder, owned a distributorship/import wine company in San Francisco.</p>
        <p>We're wine people first and salespeople second; we hand-sell all of our wine, working with retailers and restaurants to find what's right for them.</p>
        <GoButton className="button-front" onClick={()=>navigate('/about')}>Learn More About Us</GoButton>
      </Section>

      <Section className="sec-default">
        <h2>What We're Doing</h2>
        <p>"We don't just supply wine to x number of business - we also host events for, both here and around the Twin Cities."</p>
        <GoButton className="button-front" onClick={()=>navigate('/events')}>See Upcoming Events</GoButton>
      </Section>

      <Section className="sec-default">
        <h2>Who We Work With</h2>
        <p>New France Wine Company has a large and eclectic portfolio, focusing on France, Italy, and Spain, but with an eye toward value in all parts of the world, including domestic, Portugal, Australia, and elsewhere.</p>
        <p>All of our imported wines are domaine-bottled, and we strive to work with producers who are the best at their craft.</p>
        <GoButton className="button-front" onClick={()=>navigate('/partners')}>View Our Partners</GoButton>
      </Section>

    </main>
  )
}