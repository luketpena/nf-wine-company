import React, {useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import background from './background.mp4';

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const LandingTop = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  video {
    z-index: -5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TitleBox = styled.div`
  text-align: center;
  color: white;
  font-size: 32px;
  text-shadow: 0 0 4px black;
  width: 100%;
  h1, p {
    margin: 0;
    font-family: var(--font-title);
  }
  h1 {
    font-size: 2em;
  }
  animation-name: ${fadeIn};
  animation-duration: 4s;
`;

export default function Landing() {

  useEffect(()=>{
    document.getElementById('bkg-vid').play();
  },[]);

  return (
    <LandingTop>
      
      <video muted loop id="bkg-vid">
        <source src={background} type="video/mp4" />
      </video>

      <TitleBox>
        <p>Welcome to</p>
        <h1>New France Wine Company</h1>
      </TitleBox>
    </LandingTop>
  )
}