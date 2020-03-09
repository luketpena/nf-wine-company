import React from 'react';
import styled from 'styled-components';
import background from './background.jpg';

const LandingTop = styled.section`
  height: 100vh;
  width: 100vw;
  background: url(${background});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  text-align: center;
`;

const TitleBox = styled.div`
  width: 100vw;
  text-align: center;
  color: white;
  font-size: 32px;
  text-shadow: 0 0 4px black;
  h1, p {
    margin: 0;
    font-family: var(--font-title);
  }
`;

export default function Landing() {


  return (
    <LandingTop>
      <TitleBox>
        <p>Welcome to</p>
        <h1>The New France Wine Company</h1>
      </TitleBox>
    </LandingTop>
  )
}