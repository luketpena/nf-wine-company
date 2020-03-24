import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import WorldMap from './WorldMap';
import ProducerList from './ProducerList';

const Container = styled.div`

`;

const Landing = styled.div`
  padding: 128px 16px;
  color: white;
  text-align: center;
  text-shadow: 0 0 2px black;
`;

const MapBox = styled.div`
  margin-bottom: 0;
  padding: 0 48px;
  display: grid;
  grid-template-areas: "map list";
  grid-template-columns: 1fr auto;

  #world-map {
    height: max-content;
  }
`;

const MapList = styled.div`
  background-color: #EEE;
  width: 250px;
  height: ${props=>props.height}px;
  overflow-y: scroll;
`;

const MapListItem = styled.div`
  margin: 1px;
  background-color: white;
  padding: 8px 32px;
  text-align: center;
  cursor: pointer;
  transition: all .2s;
  font-size: 1em;
  &:hover {
    background-color: var(--col-primary);
    color: white;
  }
`;

export default function Partners() {

  let [mode,setMode] = useState('country');
  let [hover,setHover] = useState('');
  let [mapHeight, setMapHeight] = useState(0);

  const countries = useSelector(state=>state.places.countries);

  //The side bar uses the map to determine its height
  //It watches the window resizing to adjust this
  useEffect(()=>{
    function handleResize() {
      let target = document.getElementById('world-map');
      if (target) {
        setMapHeight(target.offsetHeight);
        console.log('Current map height:',target.offsetHeight);
      }
    }
    handleResize();
    window.addEventListener('resize',handleResize);
  });

  //Extracting just the country_codes into an array
  function populateCountryList() {
    return countries.map((item,i)=>{
      return item.country_code;
    });
  }

  //This renders the list of selectable countries / regions / subregions
  function renderMapList() {
    switch(mode) {
      case 'country':
        return countries.map( (item,i)=>{
          return (
            <MapListItem
              onMouseEnter={()=>setHover(item.country_code)}
              onMouseLeave={()=>setHover('')}
              key={i}
            >
              {item.name}
            </MapListItem>
          )
        });
        break;
    }
  }


  return (
    <Container>

      <Landing>
        <h1>Our Partners</h1>
        <p>Insert a paragraph about the the qualities of the producers you work with.</p>
      </Landing>

      
      <MapBox className="sec-default">
        
        <div id="world-map">
          <WorldMap countryList={populateCountryList()} hover={hover}/>   
        </div>
        <MapList height={mapHeight}>
          {renderMapList()}
        </MapList> 
      
      </MapBox>
      
      <ProducerList />
      
    </Container>
  )
}