import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

import WorldMap from './WorldMap';
import ProducerList from './ProducerList';


const Container = styled.div`

`;

const Landing = styled.div`
  padding: 128px 0;
  color: white;
  text-align: center;
  text-shadow: 0 0 2px black;
  div {
    background-color: rgba(0,0,0,.5);
    box-sizing: border-box;
    padding: 16px;
    backdrop-filter: blur(8px);
  }
`;

const MapBox = styled.div`
  margin-bottom: 0;
  padding: 0 48px;
  display: grid;
  grid-template-areas: "map back" "map list";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;

  #world-map {
    height: max-content;
    grid-area: map;
  }

  .button-box {
    height: 48px;
    grid-area: back;
    
    button {
      font-size: 1.5em;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      transition: all .2s;
      color: #AAA;
      .icon {
        margin-right: 16px;
        transition: margin-right .2s;
      }
      &:hover {
        color: var(--col-primary);
        .icon {
          margin-right: 24px;
        }
      }
    }
  }
`;

const MapList = styled.div`
  background-color: #EEE;
  width: 250px;
  height: ${props=>props.height}px;
  overflow-y: scroll;
  grid-area: list;
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

  const dispatch = useDispatch();

  let [mode,setMode] = useState('country'); //Used to step between layers of searching
  let [hover,setHover] = useState(''); //Which button or map icon is being hovered over
  let [countrySelect, setCountrySelect] = useState(''); //Used by the map to determine what country is being viewed
  let [mapHeight, setMapHeight] = useState(0); //Tracks the height of the map to resize the item list

  let [search, setSearch] = useState('');
  let [countryFilter, setCountryFilter] = useState('');
  let [regionFilter, setRegionFilter] = useState('');
  let [subregionFilter, setSubregionFilter] = useState('');

  let [sort, setSort] = useState('name');
  let [order,setOrder] = useState('ASC');

  const countries = useSelector(state=>state.places.countries);
  const regions = useSelector(state=>state.places.regions);
  const subregions = useSelector(state=>state.places.subregions);

  //>> Adjusts the height of the sidebar by watching the window size and reacting to the map height
  useEffect(()=>{
    function handleResize() {
      let target = document.getElementById('world-map');
      if (target) {
        setMapHeight(target.offsetHeight);
      }
    }
    handleResize(); //Used to call it on mount, very inefficient: update later
    window.addEventListener('resize',handleResize);
  });

  //>> This subregion retrieves producers by reacting to search parameters
  useEffect(()=>{
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search, country: countryFilter, region: regionFilter, subregion: subregionFilter, sort}});
    //>> Updating regions to match the targeted country
    if (countryFilter) {
      dispatch({type: 'GET_REGIONS', payload: countryFilter});
    } else {
      dispatch({type: 'SET_REGIONS', payload: []});
    }
    //>> Updating subregions to match the targeted region
    if (subregionFilter) {
      dispatch({type: 'GET_SUBREGIONS', payload: regionFilter});
    } else {
      dispatch({type: 'SET_SUBREGIONS', payload: []});
    }
  },[dispatch,countryFilter,regionFilter,subregionFilter,sort]);


  //Extracting just the country_codes into an array
  function populateCountryList() {
    return countries.map((item,i)=>{
      return item.country_code;
    });
  }

  function selectCountry(country) {
    setCountryFilter(country.id);
    setCountrySelect(country.country_code);
    setMode('region');
  }

  function selectRegion(id) {
    setRegionFilter(id);
    setMode('subregion');
  }

  function selectSubregion(id) {
    setSubregionFilter(id);
  }

  //This renders the list of selectable countries / regions / subregions
  function renderMapList() {
    switch(mode) {
      case 'country':
        return countries.map( (item,i)=>{
          return (
            <MapListItem
              onClick={()=>selectCountry(item)}
              onMouseEnter={()=>setHover(item.country_code)}
              onMouseLeave={()=>setHover('')}
              key={i}
            >
              {item.name}
            </MapListItem>
          )
        });
      case 'region':
        return regions.map( (item,i)=>{
          console.log(item.id);
          
          return (
            <MapListItem
              onClick={()=>selectRegion(item.id)}
              key={i}
            >
              {item.name}
            </MapListItem>
          )
        });
      case 'subregion':
        return subregions.map( (item,i)=>{
          return (
            <MapListItem
              onClick={()=>selectSubregion(item.id)}
              key={i}
            >
              {item.name}
            </MapListItem>
          )
        });
      default: /* Keeping React happy */ break;
    }
  }

  function renderBackButton() {

    function clickBack() {
      switch(mode) {
        case 'subregion': 
          setMode('region'); 
          setRegionFilter('');
          break;
        case 'region': 
          setMode('country');
          setCountryFilter('');
          setCountrySelect('');
          setHover('');
          break;
        default: /* Keeping React happy */ break;
      }
    }

    if (mode!=='country') {
      return (
        <button onClick={clickBack}>
          <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
          Back
        </button>
      )
    }
  }

  return (
    <Container>

      <Landing>
        <div>
          <h1>Our Partners</h1>
          <p>Insert a paragraph about the the qualities of the producers you work with.</p>
        </div>
      </Landing>

      
      <MapBox className="sec-default">
        
        <div id="world-map">
          <WorldMap countryList={populateCountryList()} hover={hover} select={countrySelect}/>   
        </div>

        <div className="button-box">
          {renderBackButton()}
        </div>
        <MapList height={mapHeight}>
          {renderMapList()}
        </MapList> 
      
      </MapBox>

      {/* 
        Both the producer list and the partners page need access to all of the search parameters.
        Unless... maybe I should share just a search function? Nah, it still needs all of the stuff.

        This is shared so they both can dispatch to get producers.
      */}
      <ProducerList 
        search={search}
        setSearch={setSearch}
        countryFilter={countryFilter} 
        regionFilter={regionFilter} 
        subregionFilter={subregionFilter}
        setSort={setSort} 
        setOrder={setOrder}
        sort={sort}
        order={order}/>
      
    </Container>
  )
}