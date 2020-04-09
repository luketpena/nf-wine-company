import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

/*-----< Component Imports >-----*/
import Landing from './Landing/Landing';

/*-----< Styling >-----*/
const Container = styled.main`
  .top-section {
    box-shadow: 0 -32px 100px 4px rgba(20,5,0,.25);
  }
  .sec-default:last-child {
    margin-bottom: 128px;
  }
`;

const Section = styled.section`
  margin-bottom: 0;
  .sec-default-content {
    padding-bottom: 0;
    padding-top: 16px;
  }
`;

const Divider = styled.div`
  margin-top: 48px;
  border-bottom: 1px solid #DDD;
`;


/*-----< Component Function >-----*/
export default function Home() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'SET_PAGETOP', payload: window.innerHeight});
  },[dispatch])

  function navigate(url) {
    history.push(url);
    window.scrollTo(0,0);
  }

  return (
    <Container>
      <Landing/>

      <Section className="sec-default top-section">
        <div className="sec-default-content">
          <h2>Who We Are</h2>
          <p>We're a small company that specializes in niche producers who make great wine. New France Wine Company has been in Minnesota since 1990; previously, Robert Rudolph, owner and founder, owned a distributorship/import wine company in San Francisco.</p>
          <p>We're wine people first and salespeople second; we hand-sell all of our wine, working with retailers and restaurants to find what's right for them.</p>
          <button className="button-front" onClick={()=>navigate('/about')}>Learn More About Us</button>
          <Divider/>
        </div>       
      </Section>

      <Section className="sec-default">
        <div className="sec-default-content">
          <h2>What We're Doing</h2>
          <p>"We don't just supply wine to x number of business - we also host events for, both here and around the Twin Cities."</p>
          <button className="button-front" onClick={()=>navigate('/events')}>See Upcoming Events</button>
          <Divider/>
        </div>       
      </Section>

      <Section className="sec-default">
        <div className="sec-default-content">
          <h2>Who We Work With</h2>
          <p>New France Wine Company has a large and eclectic portfolio, focusing on France, Italy, and Spain, but with an eye toward value in all parts of the world, including domestic, Portugal, Australia, and elsewhere.</p>
          <p>All of our imported wines are domaine-bottled, and we strive to work with producers who are the best at their craft.</p>
          <button className="button-front" onClick={()=>navigate('/partners')}>View Our Partners</button>
          <Divider/>
        </div>
      </Section>

    </Container>
  )
}