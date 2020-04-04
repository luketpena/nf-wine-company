import React, {useState, useEffect} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//-----< Component Imports >-----\\
import ProducerWidget from './ProducerWidget';
import ManagerTitle from '../ManagerTitle';

//-----< Styling >-----\\
const ProducerTable = styled.table``;

const SortHeader = styled.th`
  color: #DDD;
  &:hover {
    color: white;
  }
`;

const ButtonHeader = styled.th`
  width: 64px;
`;

const SortText = styled.span`
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const SearchBar = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  form {
    max-width: 500px;
    width: 100%;

    input {
      width: 100%;
      margin-bottom: 8px;
    }

    button {
      display: block;
      margin: 16px auto;
    }
  }
`;

const SelectBox = styled.div`
  display: flex;
  flex-wrap: true;
  select {
    width: 45%;
    margin: 8px 2.5%;
  }

`;

const DisplaySelect = styled.div`
  margin: 8px;
  text-align: center;
  color: ${props=>(props.displaySelect===props.index? 'gray' : '#DDD')};
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const DisplaySelectBox = styled.div`
  display: flex;
  justify-content: center;
`;

//-----< Component Function >-----\\
export default function ProducerLanding() {

  //>> Set up
  const dispatch = useDispatch();
  //>> Accessing reducers
  let producer = useSelector(state=>state.producer);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);
  let subregions = useSelector(state=>state.places.subregions);
  //>> Creating state
  let [search, setSearch] = useState('');
  let [countryFilter, setCountryFilter] = useState('');
  let [regionFilter, setRegionFilter] = useState('');
  let [subregionFilter, setSubregionFilter] = useState('');
  let [sort, setSort] = useState('name');
  let [order,setOrder] = useState('ASC');

  let [displayStart,setDisplayStart] = useState(0);
  let [displayUnit] = useState(50);
  let [displaySelect,setDisplaySelect] = useState(1);

  useEffect(()=>{
    dispatch({type: 'GET_COUNTRIES_FAVORITE'});
  },[dispatch]);

  //Renders all available suppliers to the list
  function renderProducers() {
    let copyArray = [...producer];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];
      for (let i=displayStart; i<Math.min(copyArray.length,displayStart+displayUnit); i++) {      
        returnArray.push(<ProducerWidget producer={copyArray[i]} key={i}/>)
      }
    return returnArray;
  }
          
  

  //Sends the search parameters to the saga for getting the filtered supplier list
  function submitSearch(event) {
    event.preventDefault();
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,country: countryFilter,region: regionFilter,sort}})
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,country: countryFilter,region: regionFilter ,sort: target}});
  }

  //Dispatches the call to get regions for a country OR empties the regions
  function selectCountry(event) {
    setCountryFilter(event.target.value);
    if (event.target.value) {
      dispatch({type: 'GET_REGIONS', payload: event.target.value});
    } else {
      dispatch({type: 'SET_REGIONS', payload: []});
    }
    setRegionFilter('');
    setSubregionFilter('');
  }

  function selectRegion(event) {
    setRegionFilter(event.target.value);
    if (event.target.value) {
      dispatch({type: 'GET_SUBREGIONS', payload: event.target.value});
    } else {
      dispatch({type: 'SET_SUBREGIONS', payload: []});
    }
    setSubregionFilter('');
  }

  //Fills the select list for countries
  function populateCountrySelect() {
    return countries.map( (country,i)=> {
      return <option key={i} value={country.id}>{country.name}</option>
    })
  }

  //Fills select list for regions of a country
  function populateRegionSelect() {
    return regions.map( (region,i)=> {
      return <option key={i} value={region.id}>{region.name}</option>
    })
  }

  function populateSubregionSelect() {
    return subregions.map( (subregion,i)=> {
      return <option key={i} value={subregion.id}>{subregion.name}</option>
    });
  }

  function renderDisplaySelect() {
    const num = producer.length/displayUnit;
    let arr = [];
    for (let i=0; i<num; i++) {
      arr.push(<DisplaySelect key={i} displaySelect={displaySelect} index={i+1} onClick={()=>selectDisplay(i)}>{i+1}</DisplaySelect>);
    }
    return arr;
  }

  function selectDisplay(index) {
    setDisplayStart(displayUnit*index);
    setDisplaySelect(index+1);
  }

  return (
    <div className="landingBox">

      <ManagerTitle title="Producers" target="/manager" />
    
      <TravelButton target="/manager/producers/new" text="Add Producer" propClass="button-secondary center-block"/>

      <SearchBar className="section-box back-search-bar">
        <form onSubmit={submitSearch}>

          <input type="text" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search for producer"/>

            <SelectBox>
              <select onChange={event=>selectCountry(event)} value={countryFilter}>
                <option value="">All countries</option>
                {populateCountrySelect()}
              </select>

              <select onChange={event=>selectRegion(event)} value={regionFilter}>
                <option value="">All regions</option>
                {populateRegionSelect()}
              </select>

              <select onChange={event=>setSubregionFilter(event)} value={subregionFilter}>
                <option value="">All subregions</option>
                {populateSubregionSelect()}
              </select>
            </SelectBox>
          
          <button className="button-default">Search</button>
        </form>
      </SearchBar>

      <section className="section-box">
        <h2>Producers</h2>
        <DisplaySelectBox>
          {renderDisplaySelect()}
        </DisplaySelectBox>
        <ProducerTable>
          <thead>
            <tr>
              <SortHeader><SortText onClick={()=>triggerFilter('name')}>Producer</SortText></SortHeader>
              <SortHeader><SortText onClick={()=>triggerFilter('country')}>Country</SortText></SortHeader>
              <SortHeader><SortText onClick={()=>triggerFilter('region')}>Region</SortText></SortHeader>
              <th>Website</th>
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader><SortText onClick={()=>setOrder((order==='ASC'? 'DESC' : 'ASC'))}>{(order==='ASC'? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}</SortText></ButtonHeader>
            </tr>
          </thead>
          <tbody>
            {renderProducers()}
          </tbody>
        </ProducerTable>
      </section>
    </div>
  )
}