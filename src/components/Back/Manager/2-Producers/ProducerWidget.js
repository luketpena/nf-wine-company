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
    dispatch({type: 'TRIGGER_SET_EDIT_INFO', payload: props.producer});
  }

  useEffect(()=>{
    if (ready && editReady) {
      history.push('/manager/producers/edit');
    }
  });

  function deleteProducer() {
    dispatch({type: 'DELETE_PRODUCER', payload: props.producer.id})
  }

  return (
    <>
      <tr>
        <td>{props.producer.name}</td>
        <td>{props.producer.country_name}</td>
        <td>{props.producer.region_name}</td>
        <td>{props.producer.website_url}</td>
        <td><button className="button-back-static" onClick={()=>setDetailsActive(true)}>Details</button></td>
        <td><button className="button-back-static" onClick={clickEdit}>Edit</button></td>
        <td><button className="button-back-static-negative" onClick={deleteProducer}>Delete</button></td>
      </tr>
      <Modal open={detailsActive} handleClose={()=>setDetailsActive(false)}>
        <h3>{props.producer.name}</h3>
        <p>
          {props.producer.country_name && <span>{props.producer.country_name}</span>}
          {props.producer.region_name && <span>{props.producer.region_name}</span>}
          {props.producer.subregion_name && <span>{props.producer.subregion_name}</span>}
        </p>
      </Modal>
    </>
  )
}