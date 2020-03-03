import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Modal from '../../../GenUse/Modal/Modal';

const Container = styled.div`
  border-bottom: 1px dotted #DDD;
  display: grid;
  grid-template-areas: "info buttons";
  grid-template-columns: 1fr auto; 
  padding: 4px;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    grid-template-areas: "info" "buttons";
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const ButtonBox = styled.div`
  grid-area: buttons;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  button {
    margin-left: 4px;
  }
`;

const InfoBox = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  
  .code-in {
    width: 48px;
  }
  .info-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    @media only screen and (max-width: 600px) {
      align-items: center;
    }
  }

  .info-title {
    font-weight: bold;
  }
  .info-count {
    color: ${props=>(props.count===0? 'gray' : 'var(--col-approve)')};
  }
`;

export default function RegionWidget(props) {

  const {id, name, country_id, producer_count, subregion_count} = props.region;
  const dispatch = useDispatch();

  let [edit, setEdit] = useState(false);
  let [name_in, setName_in] = useState(name);

  let [subregion_in, setSubregion_in] = useState('');

  const subregions = useSelector(state=>state.places.subregions);

  function deleteRegion() {
    if (Number(producer_count)===0) {
      dispatch({type: 'DELETE_REGION', payload: {region_id: id, country_id}});
    } else {
      alert('This region has producers associated with it. Consider updating the region information instead, or remove those producers from this region before deleting.');
    }
  }


  function handleClose() {
    setEdit(false);
    dispatch({type: 'SET_SUBREGIONS', payload: []});
  }

  function toggleEdt() {
    setEdit(true);
    dispatch({type: 'GET_SUBREGIONS', payload: id});
  }

  function deleteSubregion(subregion_id) {
    dispatch({type: 'DELETE_SUBREGION', payload: {id: subregion_id, region_id: id, country_id}});
  }

  function renderSubregions() {
    if (subregions && subregions.length>0) {
      return (
        <ul>
          {
            subregions.map((item,i)=>{
              return (
                <li key={i}>
                  {item.name}
                  <button onClick={()=>deleteSubregion(item.id)}>Remove</button>
                </li>
              )
            })
          }
        </ul>
      )
    } else {
      return <p>There are no subregions listed for this region.</p>
    }
  }

  function submitSubregion(event) {
    event.preventDefault();
    dispatch({type: 'ADD_SUBREGION', payload: {region_id: id, name: subregion_in, country_id}});
    setSubregion_in('');
  }


  return (
    <Container>

      <InfoBox count={Number(producer_count)}>
        <div className="info-text">
          <p className="info-title">{name}</p>
          <p className="info-count">
            {(Number(producer_count)===1? '1 Producer' : `${producer_count} Producers`)}
          </p>
          <p className="info-count">
            {(Number(subregion_count)===1? '1 Subregion' : `${subregion_count} Subregions`)}
          </p>
        </div>
      </InfoBox>

      <ButtonBox>
        <button className="button-default" onClick={toggleEdt}>Edit</button>
        <button className="button-primary" onClick={deleteRegion}>Delete</button>
      </ButtonBox>

      <Modal open={(edit && subregions)} handleClose={handleClose}>
        <h2>{name}</h2>
        <form onSubmit={event=>submitSubregion(event)}>
          <input type="text" value={subregion_in} onChange={event=>setSubregion_in(event.target.value)}/> 
          <button>Add Subregion</button>
        </form>

        {renderSubregions()}
      </Modal>

    </Container>
  )
}