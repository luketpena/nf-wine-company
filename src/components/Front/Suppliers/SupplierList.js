import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import SupplierListSegment from './SupplierListSegment';

const emptyAlphabet = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: [],
}

export default function SupplierList() {

  const suppliers = useSelector(state=>state.supplier);
  const [alphabet, setAlphabet] = useState({});

  function renderSupplierList() {
    //Start with an empty object
    const newAlphabet = {};
    
    //Iterate through suppliers
    for (let supplier of suppliers) {
      //Collect the first letter of their names
      const firstLetter = supplier.name.charAt(0).toUpperCase();
      //If a property to that letter hasn't be made, create it now as an empty array
      if (!newAlphabet.hasOwnProperty(firstLetter)) {
        newAlphabet[firstLetter] = [];
      }
      //Push the supplier to that letter group array in the object
      newAlphabet[firstLetter].push(supplier);   
    }

    //Extract the letters into their own array
    const letters = Object.keys(newAlphabet);
    //Iterate through the letters while pointing to the alphabet object
    return letters.map( (item,i)=>{
      return <SupplierListSegment key={i} letter={item} suppliers={newAlphabet[item]}/>
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