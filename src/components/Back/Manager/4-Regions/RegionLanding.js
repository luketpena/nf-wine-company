import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import ManagerTitle from '../ManagerTitle';
import RegionWidget from './RegionWidget';

const Container = styled.div``;

const RegionList = styled.div`
  min-width: max-content;
  max-width: 500px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  select {
    width: max-content;
    margin: 0 auto;
  }
  form {
    display: block;
    margin: 0 auto;
  }
`;

export default function RegionLanding() {

  const dispatch = useDispatch();

  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);

  let [countryFilter, setCountryFilter] = useState('');


  //Dispatches the call to get regions for a country OR empties the regions
  function updateCountry(event) {
    setCountryFilter(event.target.value);
    if (event.target.value) {
      dispatch({type: 'GET_REGIONS', payload: event.target.value});
    } else {
      dispatch({type: 'SET_REGIONS', payload: []});
    }
  }

  //Fills the select list for countries
  function populateCountrySelect() {
    return countries.map( (country,i)=> {
      return <option key={i} value={country.id}>{country.name}</option>
    })
  }

  function renderRegions() {
    return regions.map( (region,i)=>{
      return <RegionWidget key={i} region={region}/>
    })
  }

  return (
    <Container>
      <ManagerTitle title="Regions" target="/manager"/>
      <InputBox className="section-box">

        <h2>Select a Country</h2>
        <select onChange={(event)=>updateCountry(event)} value={countryFilter}>
          <option></option>
          {populateCountrySelect()}
        </select>

        <h2>Add a Region</h2>
        <form>
          <input type="text" placeholder="Region Name"/>
          <button>Submit</button>
        </form>

      </InputBox>
      <RegionList className="section-box">
         <h2>Region List</h2>
         {renderRegions()}
      </RegionList>
    </Container>
  )
}