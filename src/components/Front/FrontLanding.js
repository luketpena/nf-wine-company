import React from 'react';
import styled from 'styled-components';

const Landing = styled.div`
  padding: 96px 0;
  color: white;
  text-align: center;
  text-shadow: 0 0 2px black;
  
  div {
    background-color: rgba(0,0,0,.5);
    box-sizing: border-box;
    padding: 16px;
    backdrop-filter: blur(8px);
  }

  h1 {
    font-size: 2em;
  }
`;

export default function FrontLanding(props) {
  return (
    <Landing>
        <div>
          <h1>{props.title}</h1>
          {(props.text? <p>{props.text}</p> : <></>)}
        </div>
      </Landing>

  )

}