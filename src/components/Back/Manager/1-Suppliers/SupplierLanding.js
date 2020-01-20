import React, {useState} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import SupplierWidget from './SupplierWidget';

const SupplierTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead {
    background-color: var(--col-primary);
    color: white;
  }
  tbody tr {
    border-bottom: 2px dotted #EEE;
  }
  tr {
    height: 32px;
  }
  td {
    padding: 2px 8px;
  }
`;

export default function SupplierLanding() {

  const dispatch = useDispatch();
  let supplier = useSelector(state=>state.supplier);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);

  let [search, setSearch] = useState('');
  let [countryFilter, setCountryFilter] = useState('');
  let [regionFilter, setRegionFilter] = useState('');

  function renderSuppliers() {
    return supplier.supplierList.map( (item,i)=> {
      return (
        <SupplierWidget supplier={item} key={i}/>
      )
    })
  }

  function submitSearch(event) {
    event.preventDefault();
    console.log('Search value:',search);
    dispatch({type: 'GET_SUPPLIERS_FILTER', payload: {search,countryFilter,regionFilter}})
  }

  function updateCountry(event) {
    setCountryFilter(event.target.value);
    dispatch({type: 'GET_REGIONS', payload: event.target.value});
    setRegionFilter('');
  }

  function populateCountrySelect() {
    let list = countries.map( (country,i)=> {
      return <option key={i} value={country.id}>{country.name}</option>
    })
    return list;
  }

  //Fills the region select with options from the region list
  function populateRegionSelect() {
    let list = regions.map( (region,i)=> {
      return <option key={i} value={region.id}>{region.name}</option>
    })
    return list;
  }

  return (
    <div className="landingBox">

      <h1>Suppliers</h1>
      
      <TravelButton target="/manager" text="Back" propClass='button-default'/>
      <section className="section-box">
        <TravelButton target="/manager/suppliers/new" text="Add Supplier" propClass="button-secondary center-block"/>
      </section>

      <section className="section-box">
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search"/>
          <label>
            Filter:

            <select onChange={(event)=>updateCountry(event)} value={countryFilter}>
              <option></option>
              {populateCountrySelect()}
            </select>

            <select onChange={(event)=>setRegionFilter(event.target.value)} value={regionFilter}>
              <option ></option>
              {populateRegionSelect()}
            </select>

            

          </label>
          
          <button>Submit</button>
        </form>
      </section>

      <section className="section-box">
        <h2>Suppliers</h2>
        <SupplierTable>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Country</th>
              <th>Region</th>
              <th>Website</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
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