import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

const ContainerDesktop = styled.nav`
  
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

const ContainerMobile = styled.nav`
  position: fixed;
  top: 0;
  left: 0; 
  z-index: 10;
  width: ${props=>(props.active? '100%' : '48px')};
  height: 100vh;
  transition: width .5s;

  .icon {
    color: white;
    font-size: 2em;
    margin: 8px;
    position: absolute;
    text-align: right;
    top: 0;
    right: 0;
    z-index: 11;
  }

  .menu-list {
    background-color: rgba(165, 42, 42, .9);
    backdrop-filter: blur(16px);
    height: 100%;
    position: relative;
    transition: right .5s;
    right: ${props=>(props.active? '0' : '48')}px;
  }
`;

export default function Menu() {

  let [scrollY, setScrollY] = useState(0);
  let [mount, setMount] = useState(false);
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  let [menuActive, setMenuActive] = useState(false);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      window.addEventListener('scroll',handleScroll,true);
      window.addEventListener('resize',()=>setScreenWidth(window.innerWidth));
    }
  },[scrollY, mount]);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  function renderMenu() {
    if (screenWidth>800) {
      return (
        <ContainerDesktop id="menu" scrollY={scrollY} point={window.innerHeight*.25}>
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
        </ContainerDesktop>
      )
    } else {
      return (
        <ContainerMobile active={menuActive}>
          <FontAwesomeIcon 
            className="icon" 
            icon={(menuActive? faTimes : faBars)}
            onClick={()=>setMenuActive(!menuActive)}
          />
          <div className="menu-list">

          </div>
        </ContainerMobile>
      )
    }
  }

  return (
    <>
      {renderMenu()}
    </>
  )
}