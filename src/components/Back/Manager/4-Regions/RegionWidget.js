import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px dotted #DDD;
  display: grid;
  grid-template-areas: "info buttons";
  grid-template-columns: 1fr auto; 
  padding: 4px;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  grid-area: buttons;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  button {
    margin-left: 4px;
  }
`;

const InfoBox = styled.div`
  grid-area: info;
`;

export default function RegionWidget(props) {

  const {id, name, region_code, country_id} = props.region;
  const dispatch = useDispatch();

  let [edit, setEdit] = useState(false);
  let [name_in, setName_in] = useState(name);
  let [code_in, setCode_in] = useState(region_code);

  function deleteRegion() {
    dispatch({type: 'DELETE_REGION', payload: {region_id: id, country_id}});
  }

  function submitEdit() {

  }

  function cancelEdit() {
    setName_in(name);
    setCode_in(region_code);
    setEdit(false);
  }

  function renderButtons() {
    if (edit) {
      return (
        <>
          <button className="button-confirm" onClick={submitEdit}>Submit</button>
          <button className="button-default" onClick={cancelEdit}>Cancel</button>
        </>
      )
    } else {
      return (
        <>
          <button className="button-default" onClick={()=>setEdit(true)}>Edit</button>
          <button className="button-primary" onClick={deleteRegion}>Delete</button>
        </>
      )
    }
  }

  return (
    <Container>

      <InfoBox>
        <p>{name} - {region_code} </p>
      </InfoBox>

      <ButtonBox>
        {renderButtons()}
      </ButtonBox>

    </Container>
  )
}