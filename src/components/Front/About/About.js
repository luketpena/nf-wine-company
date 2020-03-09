import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const Landing = styled.div`
  padding: 128px 16px;
`;

const SecInfo = styled.section`
  display: grid;
  grid-template-areas: "image text";
  grid-template-columns: auto 1fr;

  @media only screen and (max-width: 500px) {
    grid-template-areas: "image" "text";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .info-img {
    grid-area: image;
    width: 100%;
    object-fit: cover;
    max-width: 300px;
    
  }

  .info-text {
    grid-area: text;
  }
`;



export default function About() {
  return (
    <Container>
      <Landing>
        <h1>About Us</h1>
      </Landing>
      <SecInfo className="sec-default">
        <img 
          src="https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-3.jpg"
          alt="New France Wine Company Offices"
          className="info-img"
        />

        <div className="info-text">
          <h2>A Little More About New France Wine</h2>
          <p>
            [Here you can put a big long paragraph about details of the company - where you started from, what you do, what you value. What makes you unique.]
          </p>
        </div>

        
      </SecInfo>
    </Container>
  )
}