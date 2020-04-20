import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import SupplierListSegment from './SupplierListSegment';

const TypeTitle = styled.h2`
  font-size: 3em;
  margin: 16px 0;
`


export default function SupplierList(props) {

  const suppliers = useSelector(state=>state.supplier);
  function renderSupplierList() {
    //Start with an empty object in which to group suppliers by letter
    const groupedSuppliers = {};
    
    //Iterate through suppliers
    for (let supplier of suppliers) {
      if ( (props.type==="direct" && supplier.direct) || (props.type==="independent" && !supplier.direct)) {
        //Collect the first letter of their names
        const firstLetter = supplier.name.charAt(0).toUpperCase();
        //If a property to that letter hasn't be made, create it now as an empty array
        if (!groupedSuppliers.hasOwnProperty(firstLetter)) {
          groupedSuppliers[firstLetter] = [];
        }
        //Push the supplier to that letter group array in the object
        groupedSuppliers[firstLetter].push(supplier);
      }
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
        <TypeTitle>{(props.type==="direct"? "Winery Direct" : "Independent")}</TypeTitle>
        {renderSupplierList()}
      </div>
    </div>
  )
}