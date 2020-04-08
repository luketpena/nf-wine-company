import React, {useState} from 'react';
import {useSelector} from 'react-redux';

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
    const newAlphabet = {...alphabet};

    for (let supplier of suppliers) {
      const firstLetter = supplier.name.charAt(0).toLowerCase();
      

      if (!newAlphabet.hasOwnProperty(firstLetter)) {
        newAlphabet[firstLetter] = [];
      }

      newAlphabet[firstLetter].push(supplier);
    }

    console.log('New alphabet:',newAlphabet);
    
  }

  return (
    <div>
      {renderSupplierList()}
    </div>
  )
}