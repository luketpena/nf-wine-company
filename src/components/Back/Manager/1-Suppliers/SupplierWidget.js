import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.tr`

`;

const Data = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 12px;
  padding: 12px 4px;
  border-bottom: 1px dotted #DDD;
`;

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
    <Container>
      <Data>{props.supplier.name}</Data>
      <Data>{props.supplier.country_name}</Data>
      <Data>{props.supplier.region_name}</Data>
      <Data>{props.supplier.website_url}</Data>
      <Data><button>Details</button></Data>
      <Data><button onClick={clickEdit}>Edit</button></Data>
      <Data><button onClick={deleteSupplier}>Delete</button></Data>
    </Container>
  )
}