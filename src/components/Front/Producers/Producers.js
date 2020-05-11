import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

import WorldMap from './WorldMap';

//-----< Component Imports >-----\\
import ProducerList from './ProducerList';
import FrontLanding from '../FrontLanding';


const Container = styled.div``;

const MapBanner = styled.div`
  margin-bottom: 24px;
`;

const MapBox = styled.div`
  padding: 16px 48px;
  display: grid;
  grid-template-areas: "map back" "map list";
  grid-template-columns: 1fr 250px;
  grid-template-rows: auto 1fr;

  max-width: 1000px;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    grid-template-areas: "map" "back" "list";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

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
  height: ${props=>props.height}px;
  overflow-y: scroll;
  grid-area: list;
  position: relative;

  box-shadow: 0 0 16px 0 rgba(0,0,0,.2);
  border-radius: 16px;
  overflow-x: hidden;
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

const titleText = [
  `Though spanning the globe, a common thread runs through the work of the family wineries we represent: a profound attAchment and respect for the land they are on; a thoughtful and gentle hand in the cellar to create wines that speak of their place; and a passion for the art of winemaking despite all the risks involved.`,
  `We are honored to share the wine of these great winemakers.`
]

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
      return item;
    });
  }

  function selectCountry(country) {
    console.log('Selected Country: ',country);
    
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

      <FrontLanding 
        title="Producers" 
        text={titleText}/>

      <MapBanner className="sec-default">
        <MapBox className="sec-default-content">
          
          <div id="world-map">
            <WorldMap countryList={populateCountryList()} hover={hover} select={countrySelect} setSelect={selectCountry}/>   
          </div>

          <div className="button-box">
            {renderBackButton()}
          </div>

          <MapList height={mapHeight}>
            {renderMapList()}
          </MapList> 
        
        </MapBox>
      </MapBanner>

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