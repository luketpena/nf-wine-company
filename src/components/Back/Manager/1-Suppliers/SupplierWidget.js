import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function SupplierWidget(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  let editReady = useSelector(state=>state.edit.ready);
  let [ready,setReady] = useState(false);

  function clickEdit() {
    setReady(true)
    dispatch({type: 'TRIGGER_SET_EDIT_INFO', payload: props.supplier});
  }

  useEffect(()=>{
    if (ready && editReady) {
      history.push('/manager/suppliers/edit');
    }
  });

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
      <td><button onClick={clickEdit}>Edit</button></td>
      <td><button onClick={deleteSupplier}>Delete</button></td>
    </tr>
  )
}