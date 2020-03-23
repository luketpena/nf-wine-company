import React from 'react';
import styled from 'styled-components';
import MapPaths from './MapPaths';

const Map = styled.svg`
  background-color: gray;
  align-self: center;
  .highlight {
    fill: red;
  }
  path {
    
  }
`;


export default function WorldMap() {

  function renderPaths() {
    return MapPaths.GetPaths().map( (item,i)=>{
      if (item.id==="US") {
        console.log('Found id:', item.id);
        
      }
      return (
        <path
          key={i}
          d={item.d}
          className={(item.id==="US"? "highlight" : "normal")}
        />
      )
    });
    
  }


  //"-169.110266 83.600842 190.486279 -58.508473"
  return (
    <Map
    viewBox="0 0 2000 1001">
    >
      {renderPaths()}

    </Map>
  )

}