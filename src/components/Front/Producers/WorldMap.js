import React from 'react';
import styled from 'styled-components';
import MapPaths from './MapPaths';

const Map = styled.svg`
  align-self: center;
`;

const MapPath = styled.path`
  fill: ${props=>(props.select? (props.select===props.country_id? `var(--col-primary)` : `#EEE`) : (props.highlight? `var(--col-primary)` : `#EEE`))};
  opacity: ${props=>(props.select? `1` : (props.highlight && !props.hover? `.5` : `1`))};

  transition: opacity .3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;


export default function WorldMap(props) {

  function renderPaths() {
    return MapPaths.GetPaths().map( (item,i)=>{
      let findIndex = props.countryList.findIndex(country_id=>country_id===item.id);   
      
      return (
        <MapPath
          key={i}
          d={item.d}
          highlight={(findIndex!==-1)}
          country_id={item.id}
          select={props.select}
          hover={(props.hover===item.id)}
        />
      )
    });
    
  }


  //"-169.110266 83.600842 190.486279 -58.508473"
  return (
    <Map
      viewBox="0 0 2000 1001"
      >
      {renderPaths()}

    </Map>
  )

}