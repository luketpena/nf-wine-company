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
  h2 {
    font-size: 2em;
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

const PartnerButtonBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 8px;
  }
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
          <p>Minnesotans are a hearty, well educated, well-traveled bunch. New France Wine Company was founded in 1993 to connect Minnesota with the great wineries of the world. We’re a small business with a long tenured and open-minded staff that likes to push the boundaRies and explore the pleasures of the table.</p>
          <p>Prior to becoming the territory of Minnesota our lands were part of New France or the Northern part of the Louisiana territory. We carry wines from all over the world, not just French wines.</p>
          <button className="button-front" onClick={()=>navigate('/about')}>Learn More About Us</button>
          <Divider/>
        </div>       
      </Section>

      <Section className="sec-default">
        <div className="sec-default-content">
          <h2>What We're Doing</h2>
          <p>We connect Minnesota with great wines, and we connect great wineries with Minnesota.</p>
          <p>We enjoy the challenge of introducing new wines and new regions to a foOd and wine community here that seems always anxious to explore. </p>
          <button className="button-front" onClick={()=>navigate('/events')}>See Upcoming Events</button>
          <Divider/>
        </div>       
      </Section>

      <Section className="sec-default">
        <div className="sec-default-content">
          <h2>Who We Work With</h2>
          <p>New France Wine Company has a large and eclectic portfolio, focusing on France, Italy, and Spain, but with an eyE toward value in all parts of the world, including domestic, Portugal, Australia, and elsewhere.</p>
          <p>All of our imported wines are domaine-bottled, and we strive to work with producers who are the best at their craft.</p>
          <PartnerButtonBox>
            <button className="button-front" onClick={()=>navigate('/producers')}>View Our Producers</button>
            <button className="button-front" onClick={()=>navigate('/suppliers')}>View Our Suppliers</button>
          </PartnerButtonBox>
          <Divider/>
        </div>
      </Section>

    </Container>
  )
}