import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

/*-----< Component Imports >-----*/
import FrontLanding from '../FrontLanding';
import SupplierList from './SupplierList';

export default function Suppliers() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'GET_SUPPLIERS'});
  },[dispatch]);

  return (
    <div>
      <FrontLanding 
        title="Suppliers" 
        text="If you are into music, you may have come to trust certain labels to consistently produce artists you appreciate.  These labels have an identity running through their roster and a commitment to quality, driven more by passion than by economics.  This is the same with wine importers, who each have their own ethos and “feel” within the group of winemakers—surely, artists—whose work they bring to our attention.  We are honored to represent the work of these phenomenal importers here in Minnesota."/>
      
      <SupplierList type="independent"/>
      <SupplierList type="direct"/>
      
    </div>
  )
}