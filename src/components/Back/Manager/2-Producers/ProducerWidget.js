import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

/*-----< Component Imports >-----*/
import Modal from '../../../GenUse/Modal/Modal';

/*-----< Component Function >-----*/
export default function SupplierWidget(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  let editReady = useSelector(state=>state.edit.ready);
  let [ready,setReady] = useState(false);
  let [detailsActive, setDetailsActive] = useState(false);

  function clickEdit() {
    setReady(true)
    dispatch({type: 'TRIGGER_SET_EDIT_INFO', payload: props.supplier});
  }

  useEffect(()=>{
    if (ready && editReady) {
      history.push('/manager/producers/edit');
    }
  });

  function deleteSupplier() {
    dispatch({type: 'DELETE_SUPPLIER', payload: props.supplier.id})
  }

  return (
    <>
      <tr>
        <td>{props.supplier.name}</td>
        <td>{props.supplier.country_name}</td>
        <td>{props.supplier.region_name}</td>
        <td>{props.supplier.website_url}</td>
        <td><button className="button-back-static" onClick={()=>setDetailsActive(true)}>Details</button></td>
        <td><button className="button-back-static" onClick={clickEdit}>Edit</button></td>
        <td><button className="button-back-static-negative" onClick={deleteSupplier}>Delete</button></td>
      </tr>
      <Modal open={detailsActive} handleClose={()=>setDetailsActive(false)}>
        <h3>{props.supplier.name}</h3>
        <p>
          {props.supplier.country_name && <span>{props.supplier.country_name}</span>}
          {props.supplier.region_name && <span>{props.supplier.region_name}</span>}
          {props.supplier.subregion_name && <span>{props.supplier.subregion_name}</span>}
        </p>
      </Modal>
    </>
  )
}