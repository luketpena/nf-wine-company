import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import SupplierWidget from './SupplierWidget';

const SupplierTable = styled.div`
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

  let supplier = useSelector(state=>state.supplier);

  function renderSuppliers() {
    return supplier.map( (item,i)=> {
      return (
        <SupplierWidget supplier={item} key={i}/>
      )
    })
  }

  return (
    <div className="landingBox">

      <h1>Suppliers</h1>
      
      <TravelButton target="/manager" text="Back" propClass='button-default'/>
      <section className="section-box">
        <TravelButton target="/manager/suppliers/new" text="Add Supplier" propClass="button-secondary center-block"/>
      </section>

      <section className="section-box">
        <form>
          <input type="text" placeholder="Search"/>
          <label>
            Filter:
            <select>
              <option disabled>Country</option>
            </select>
            <select>
              <option disabled>Region</option>
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