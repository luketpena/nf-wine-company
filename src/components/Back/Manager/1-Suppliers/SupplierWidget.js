import React from 'react';
import {useDispatch} from 'react-redux';

export default function SupplierWidget(props) {

  const dispatch = useDispatch();

  function deleteSupplier() {
    dispatch({type: 'DELETE_SUPPLIER', payload: props.supplier.id})
  }

  return (
    <tr>
      <td>{props.supplier.name}</td>
      <td>{props.supplier.country_name}</td>
      <td>{props.supplier.region_name}</td>
      <td>{props.supplier.website_url}</td>
      <td><button>Details</button></td>
      <td><button>Edit</button></td>
      <td><button onClick={deleteSupplier}>Delete</button></td>
    </tr>
  )
}