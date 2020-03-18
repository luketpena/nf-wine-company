import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
    color: ${props=>( (props.scrollY>props.point-24 && !props.active)? 'var(--col-primary)' : 'white')};
    transition: color, .2s;
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const MobileMenuItem = styled.a`
  display: block;
  background-color: rgba(255,255,255,.1);
  position: relative;
  right: 0;
  padding: 16px;
  margin: 4px 0;
  color: white;
  font-size: 1.2em;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const menuList = [
  {name: 'Home', url: '/'},
  {name: 'About', url: '/about'},
  {name: 'Events', url: '/events'},
  {name: 'Producers and Suppliers', url: '/partners'},
  {name: 'Contact', url: '/contact'},
  {name: 'Trade Portal', url: '/login'}
]


export default function Menu() {

  let [scrollY, setScrollY] = useState(0);
  let [mount, setMount] = useState(false);
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let [menuActive, setMenuActive] = useState(false);

  const history = useHistory();

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

  function navigate(url) {
    history.push(url);
    setMenuActive(false);
    window.scrollTo(0,0);
  }

  function renderDesktopMenu() {
    return menuList.map( (item,i)=>{
      return <li key={i} onClick={()=>navigate(item.url)}>{item.name}</li>
    })
  }

  function renderMobileMenu() {
    return menuList.map( (item,i)=>{
      return <MobileMenuItem key={i} onClick={()=>navigate(item.url)}>{item.name}</MobileMenuItem>
    })
  }

  function renderMenu() {
    if (screenWidth>500) {
      return (
        <ContainerDesktop id="menu" scrollY={scrollY} point={window.innerHeight*.25}>
          <nav>
            <ul>
              {renderDesktopMenu()}
            </ul>
          </nav>
        </ContainerDesktop>
      )
    } else {
      return (
        <ContainerMobile 
          active={menuActive}
          scrollY={scrollY} 
          point={window.innerHeight}
        >
          <FontAwesomeIcon 
            className="icon" 
            icon={(menuActive? faTimes : faBars)}
            onClick={()=>setMenuActive(!menuActive)}
          />
          <div className="menu-list">
            {renderMobileMenu()}
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