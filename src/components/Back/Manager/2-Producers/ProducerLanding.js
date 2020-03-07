import React, {useState} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//-----< Component Imports >-----\\
import SupplierWidget from './ProducerWidget';
import ManagerTitle from '../ManagerTitle';

//-----< Styling >-----\\
const SupplierTable = styled.table`
  
`;

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
    width: 50%;
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
export default function SupplierLanding() {

  //>> Set up
  const dispatch = useDispatch();
  //>> Accessing reducers
  let producer = useSelector(state=>state.producer);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);
  //>> Creating state
  let [search, setSearch] = useState('');
  let [countryFilter, setCountryFilter] = useState('');
  let [regionFilter, setRegionFilter] = useState('');
  let [sort, setSort] = useState('name');
  let [order,setOrder] = useState('ASC');

  let [displayStart,setDisplayStart] = useState(0);
  let [displayUnit] = useState(50);
  let [displaySelect,setDisplaySelect] = useState(1);

  //Renders all available suppliers to the list
  function renderProducers() {
    let copyArray = [...producer];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];
      console.log(producer.length);
      for (let i=displayStart; i<Math.min(copyArray.length,displayStart+displayUnit); i++) {
        let current = copyArray[i].name;
        console.log('Current supplier:',current);
        
        returnArray.push(<SupplierWidget supplier={copyArray[i]} key={i}/>)
      }
    return returnArray;
  }
          
  

  //Sends the search parameters to the saga for getting the filtered supplier list
  function submitSearch(event) {
    event.preventDefault();
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,countryFilter,regionFilter,sort}})
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,countryFilter,regionFilter,sort: target}});
  }

  //Dispatches the call to get regions for a country OR empties the regions
  function updateCountry(event) {
    setCountryFilter(event.target.value);
    if (event.target.value) {
      dispatch({type: 'GET_REGIONS', payload: event.target.value});
    } else {
      dispatch({type: 'SET_REGIONS', payload: []});
    }
    setRegionFilter('');
  }

  //Fills the select list for countries
  function populateCountrySelect() {
    let list = countries.map( (country,i)=> {
      return <option key={i} value={country.id}>{country.name}</option>
    })
    return list;
  }

  //Fills select list for regions of a country
  function populateRegionSelect() {
    let list = regions.map( (region,i)=> {
      return <option key={i} value={region.id}>{region.name}</option>
    })
    return list;
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
      
      <section className="section-box">
        <TravelButton target="/manager/producers/new" text="Add Producer" propClass="button-secondary center-block"/>
      </section>

      <SearchBar className="section-box">
        <form onSubmit={submitSearch}>

          <input type="text" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search for producer"/>

            <SelectBox>
              <select onChange={(event)=>updateCountry(event)} value={countryFilter}>
                <option value="">All countries</option>
                {populateCountrySelect()}
              </select>

              <select onChange={(event)=>setRegionFilter(event.target.value)} value={regionFilter}>
                <option value="">All regions</option>
                {populateRegionSelect()}
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
        <SupplierTable>
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
        </SupplierTable>
      </section>
    </div>
  )
}