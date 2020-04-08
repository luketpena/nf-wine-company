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
        text="[Here you can talk about the people you partner with to get your supply,]"/>
      
      <SupplierList/>
    </div>
  )
}