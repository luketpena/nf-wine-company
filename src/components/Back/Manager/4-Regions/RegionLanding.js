import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import ManagerTitle from '../ManagerTitle';
import RegionWidget from './RegionWidget';

const Container = styled.div``;

const RegionList = styled.div`
  min-width: max-content;
  max-width: 500px;
  text-align: center;

  h2 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  select {
    width: max-content;
    max-width: 100%;
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

  let [country, setCountry] = useState('');
  let [region, setRegion] = useState('');
  let [favoritesOnly, setFavoritesOnly] = useState(true);
  


  //Dispatches the call to get regions for a country OR empties the regions
  function updateCountry(event) {
    setCountry(event.target.value);
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
      return <RegionWidget key={i+region.region_code} region={region}/>
    })
  }

  function submitRegion(event) {
    event.preventDefault();
    // Only submit a region if a country is selected
    if (country!=='') {
      const newRegion = {
        country_id: country,
        name: region,
      }
      dispatch({type: 'ADD_REGION', payload: newRegion});
    } else {
      //Reject without country
      alert('Please select a country to add to.');
    }
  }

  function getCountries(event) {
    setFavoritesOnly(event.target.checked);
    if (event.target.checked) {
      dispatch({type: 'GET_COUNTRIES_FAVORITE'});
    } else {
      dispatch({type: 'GET_COUNTRIES'});
    }
  }

  return (
    <Container>
      <ManagerTitle title="Regions" target="/manager"/>
      <InputBox className="section-box">

        <h2>Select a Country</h2>
        <select onChange={(event)=>updateCountry(event)} value={country}>
          <option></option>
          {populateCountrySelect()}
        </select>

        <label>
          <input type="checkbox" value={favoritesOnly} onChange={event=>getCountries(event)}/>
          Show Favorites Only
        </label>

        <h2>Add a Region</h2>
        <form onSubmit={submitRegion}>
          <input required type="text" placeholder="Region Name" value={region} onChange={event=>setRegion(event.target.value)}/>
          <button>Submit</button>
        </form>

      </InputBox>
      <RegionList className="section-box">
         <h2>Region List</h2>
         <p>Number of regions: {regions.length}</p>
         {renderRegions()}
      </RegionList>
    </Container>
  )
}