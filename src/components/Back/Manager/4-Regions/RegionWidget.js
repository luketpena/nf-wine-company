import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
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

  const {id, name, region_code, country_id, producer_count} = props.region;
  const dispatch = useDispatch();

  let [edit, setEdit] = useState(false);
  let [name_in, setName_in] = useState(name);

  function deleteRegion() {
    if (Number(producer_count)===0) {
      dispatch({type: 'DELETE_REGION', payload: {region_id: id, country_id}});
    } else {
      alert('This region has producers associated with it. Consider updating the region information instead, or remove those producers from this region before deleting.');
    }
  }

  function submitEdit() {
    const payload = {
      country_id,
      region_id: id,
      updatePackage: {
        name: name_in,
      }
    }
    dispatch({type: 'UPDATE_REGION', payload});
    setEdit(false);
  }

  function cancelEdit() {
    setName_in(name);
    setEdit(false);
  }



  return (
    <Container>

      <InfoBox count={Number(producer_count)}>
        <div className="info-text">
          <p className="info-title">{name}</p>
          <p className="info-count">{(Number(producer_count)===1? '1 Producer' : `${producer_count} Producers`)}</p>
        </div>
      </InfoBox>

      <ButtonBox>
        <button className="button-default" onClick={()=>setEdit(true)}>Edit</button>
        <button className="button-primary" onClick={deleteRegion}>Delete</button>
      </ButtonBox>

      <Modal open={edit} handleClose={()=>setEdit(false)}>
        
      </Modal>

    </Container>
  )
}