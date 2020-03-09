import React, {Component} from 'react';
import styled from 'styled-components';

import Landing from './Landing/Landing';

const Section = styled.section`
  margin-bottom: 64px;
  p {
    text-indent: 24px;
  }
`;

const GoButton = styled.a`
  background: none;
  border: 1px solid var(--col-primary);
  color: var(--col-primary);
  border-radius: 4px;
  padding: 4px 16px;
  display: block;
  margin: 8px auto;
  transition: all .2s;
  width: max-content;
  &:hover {
    background-color: var(--col-primary);
    color: white;
    padding: 4px 32px;
  }
`;



class Home extends Component {
  render() {
    return (
      <main>
        <Landing/>

        <Section className="sec-default">
          <h2>Who We Are</h2>
          <p>We're a small company that specializes in niche producers who make great wine. New France Wine Company has been in Minnesota since 1990; previously, Robert Rudolph, owner and founder, owned a distributorship/import wine company in San Francisco.</p>
          <p>We're wine people first and salespeople second; we hand-sell all of our wine, working with retailers and restaurants to find what's right for them.</p>
          <GoButton>Learn More About Us</GoButton>
        </Section>

        <Section className="sec-default">
          <h2>What We're Doing</h2>
          <p>"We don't just supply wine to x number of business - we also host events for, both here and around the Twin Cities."</p>
          <GoButton>See Upcoming Events</GoButton>
        </Section>

        <Section className="sec-default">
          <h2>Who We Work With</h2>
          <p>New France Wine Company has a large and eclectic portfolio, focusing on France, Italy, and Spain, but with an eye toward value in all parts of the world, including domestic, Portugal, Australia, and elsewhere.</p>
          <p>All of our imported wines are domaine-bottled, and we strive to work with producers who are the best at their craft.</p>
          <GoButton>View Our Partners</GoButton>
        </Section>
 
      </main>
    )
  }
}

export default Home;