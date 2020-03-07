import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import getOffsetTop from '../../../modules/getOffsetTop';

const Container = styled.nav`
  
  line-height: 64px;
  height: 64px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0; 
  padding-left: 16px;
  z-index: 10;

  background-color: rgba(165, 42, 42, ${props=>(props.scrollY>props.point? '.7' : '0')});
  backdrop-filter: blur(${props=>(props.scrollY>props.point? '16' : '0')}px);
  font-family: var(--font-title);
  overflow: hidden;

  transition: all .5s;

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav li {
    display: inline;
    margin-right: 16px;
    color: #EEE;
    transition: all .2s;
    border-bottom: 0px solid rgba(255,255,255,0);
    text-shadow: 0 0 4px black;
  }
  
  nav li:hover {
    color: white;
    cursor: pointer;
    border-bottom: 2px solid rgba(255,255,255,1);
  }
`;

export default function Menu() {

  let [scrollY, setScrollY] = useState(0);
  let [mount, setMount] = useState(false);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      window.addEventListener('scroll',handleScroll,true);
    }
  },[scrollY, mount]);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  return (
    <Container id="menu" scrollY={scrollY} point={window.innerHeight*.25}>
      <nav>
        <ul>
          <li>NF</li>
          <li>About</li>
          <li>Events</li>
          <li>Suppliers</li>
          <li>Producer</li>
          <li>Contact</li>
        </ul>
      </nav>
    </Container>
  )
}