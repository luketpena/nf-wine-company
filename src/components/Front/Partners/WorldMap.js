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


export default function WorldMap(props) {

  function renderPaths() {
    console.log('The list:',props.countryList);
    
    return MapPaths.GetPaths().map( (item,i)=>{
      let findIndex = props.countryList.findIndex(country_id=>country_id===item.id);
      console.log('Found index?',findIndex);   
      
      return (
        <path
          key={i}
          d={item.d}
          className={(findIndex!==-1? "highlight" : "normal")}
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