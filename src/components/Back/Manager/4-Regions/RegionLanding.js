import React, {useState, useEffect} from 'react';
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
    min-width: max-content;
    max-width: 250px;
    width: 100%;
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
  let country_details = useSelector(state=>state.places.country_details);

  let [country, setCountry] = useState('');
  let [region, setRegion] = useState('');
  let [favoritesOnly, setFavoritesOnly] = useState(true);

  useEffect(()=>{
    if (favoritesOnly) {
      dispatch({type: 'GET_COUNTRIES_FAVORITE'});
    } else {
      dispatch({type: 'GET_COUNTRIES'});
    }
  },[dispatch,favoritesOnly])
  


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
      setRegion('');
    } else {
      //Reject without country
      alert('Please select a country to add to.');
    }
  }

  function toggleFavorite() {
    if (country_details) {
      dispatch({type: 'TOGGLE_COUNTRY_FAVORITE', payload: {id: country_details.id, value: !country_details.favorite}});
    }
  }

  function renderFavoriteButton() {
    if (country_details) {
      if (country_details.favorite) {
        return <button onClick={toggleFavorite} className="button-primary">Remove from Favorites</button>
      } else {
        return <button onClick={toggleFavorite} className="button-confirm">Add to Favorites</button>
      }
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
          <input type="checkbox" checked={favoritesOnly} onChange={event=>setFavoritesOnly(event.target.checked)}/>
          Show Favorites Only
        </label>

        <h2>Add a Region</h2>
        <form onSubmit={submitRegion}>
          <input required type="text" placeholder="Region Name" value={region} onChange={event=>setRegion(event.target.value)}/>
          <button>Submit</button>
        </form>

      </InputBox>
      <RegionList className="section-box">
        <h2>{(country_details? country_details.name : 'Select a Country')}</h2>
        {renderFavoriteButton()}        
        <p>Number of regions: {regions.length}</p>
        {renderRegions()}
      </RegionList>
    </Container>
  )
}