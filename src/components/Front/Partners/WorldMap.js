import React from 'react';
import styled from 'styled-components';
import MapPaths from './MapPaths';

const Map = styled.svg`
  background-color: gray;
`;


export default function WorldMap() {

  function renderPaths() {
    return MapPaths.GetPaths().map( (item,i)=>{
      return <>{item}</>
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