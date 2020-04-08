import React from 'react';

import SupplierListItem from './SupplierListItem';

export default function SupplierListSegment(props) {

  function renderSuppliers() {
    return props.suppliers.map( (supplier,i)=>{
      return <SupplierListItem key={i} supplier={supplier} />
    });
  }

  return (
    <div>
      <h3>{props.letter}</h3>
      <ul>
        {renderSuppliers()}
      </ul>
    </div>
  )
}