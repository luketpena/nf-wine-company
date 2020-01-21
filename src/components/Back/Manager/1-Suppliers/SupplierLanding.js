import React, {useState} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//-----< Component Imports >-----\\
import SupplierWidget from './SupplierWidget';

//-----< Styling >-----\\
const SupplierTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  max-width: 800px;
  width: 100%;
  thead {
    background-color: var(--col-primary);
    color: #DDD;
  }
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
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    input {
      width: 100%;
      margin-bottom: 8px;
    }
    label span {
      margin-right: 8px;
    }
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
  let supplier = useSelector(state=>state.supplier);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);
  //>> Creating state
  let [search, setSearch] = useState('');
  let [countryFilter, setCountryFilter] = useState('');
  let [regionFilter, setRegionFilter] = useState('');
  let [sort, setSort] = useState('name');
  let [order,setOrder] = useState('ASC');

  let [displayStart,setDisplayStart] = useState(0);
  let [displayUnit] = useState(2);
  let [displaySelect,setDisplaySelect] = useState(1);

  //Renders all available suppliers to the list
  function renderSuppliers() {
    let copyArray = [...supplier];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];
      console.log(supplier.length);
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
    dispatch({type: 'GET_SUPPLIERS_FILTER', payload: {search,countryFilter,regionFilter,sort}})
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_SUPPLIERS_FILTER', payload: {search,countryFilter,regionFilter,sort: target}});
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
    const num = supplier.length/displayUnit;
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

      <h1>Suppliers</h1>
      
      <TravelButton target="/manager" text="Back" propClass='button-default'/>
      <section className="section-box">
        <TravelButton target="/manager/suppliers/new" text="Add Supplier" propClass="button-secondary center-block"/>
      </section>

      <SearchBar className="section-box">
        <form onSubmit={submitSearch}>

          <input type="text" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search for supplier"/>

            <label>
              <span>Country:</span>
              <select onChange={(event)=>updateCountry(event)} value={countryFilter}>
                <option></option>
                {populateCountrySelect()}
              </select>
            </label>

            <label>
              <span>Region:</span>
              <select onChange={(event)=>setRegionFilter(event.target.value)} value={regionFilter}>
                <option ></option>
                {populateRegionSelect()}
              </select>
            </label>
          
          <button>Submit</button>
        </form>
      </SearchBar>

      <section className="section-box">
        <h2>Suppliers </h2>
        <DisplaySelectBox>
          {renderDisplaySelect()}
        </DisplaySelectBox>
        <SupplierTable>
          <thead>
            <tr>
              <SortHeader><SortText onClick={()=>triggerFilter('name')}>Supplier</SortText></SortHeader>
              <SortHeader><SortText onClick={()=>triggerFilter('country')}>Country</SortText></SortHeader>
              <SortHeader><SortText onClick={()=>triggerFilter('region')}>Region</SortText></SortHeader>
              <th>Website</th>
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader><SortText onClick={()=>setOrder((order==='ASC'? 'DESC' : 'ASC'))}>{(order==='ASC'? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}</SortText></ButtonHeader>
            </tr>
          </thead>
          <tbody>
            {renderSuppliers()}
          </tbody>
        </SupplierTable>
      </section>
    </div>
  )
}