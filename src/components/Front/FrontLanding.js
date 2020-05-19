import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const Landing = styled.div`
  padding: 64px 0 24px 0;
  color: white;
  text-align: center;
  text-shadow: 0 0 2px black;
  width: 100%;

  .text {
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.1em;
    font-family: serif;
    line-height: 1.2em;
    margin-bottom: 32px;
  }
  
  div {
    background-color: rgba(0,0,0,.5);
    box-sizing: border-box;
    padding: 16px;
    backdrop-filter: blur(8px);
  }

  h1 {
    font-size: 3em;
    
  }
`;

export default function FrontLanding(props) {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'SET_PAGETOP', payload: document.getElementById('landing-top').offsetHeight});
  },[dispatch])

  function renderText() {
    if (props.text) {
      return props.text.map( (item,i)=>{
        return <p key={i} className="text">{item}</p>
      })
    }
  }

  return (
    <Landing id="landing-top">
      <div>
        <h1>{props.title}</h1>
        {renderText()}
      </div>
    </Landing>
  )
}