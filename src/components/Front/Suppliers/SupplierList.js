import React from 'react';
import {useSelector} from 'react-redux';

import SupplierListSegment from './SupplierListSegment';

export default function SupplierList() {

  const suppliers = useSelector(state=>state.supplier);
  function renderSupplierList() {
    //Start with an empty object in which to group suppliers by letter
    const groupedSuppliers = {};
    
    //Iterate through suppliers
    for (let supplier of suppliers) {
      //Collect the first letter of their names
      const firstLetter = supplier.name.charAt(0).toUpperCase();
      //If a property to that letter hasn't be made, create it now as an empty array
      if (!groupedSuppliers.hasOwnProperty(firstLetter)) {
        groupedSuppliers[firstLetter] = [];
      }
      //Push the supplier to that letter group array in the object
      groupedSuppliers[firstLetter].push(supplier);   
    }

    //Extract the letters into their own array
    const letters = Object.keys(groupedSuppliers);
    //Iterate through the letters while pointing to the alphabet object
    return letters.map( (item,i)=>{
      return <SupplierListSegment key={i} letter={item} suppliers={groupedSuppliers[item]}/>
    });  
  }

  return (
    <div className="sec-default">
      <div className="sec-default-content">
      {renderSupplierList()}
      </div>
    </div>
  )
}