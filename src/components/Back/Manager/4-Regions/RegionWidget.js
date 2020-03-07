import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Modal from '../../../GenUse/Modal/Modal';

const Container = styled.div`
  border-bottom: 1px dotted #DDD;
  display: grid;
  grid-template-areas: "title title" "info buttons";
  grid-template-columns: 1fr auto; 
  padding: 4px;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    grid-template-areas: "title" "info" "buttons";
    grid-template-columns: 1fr;
    justify-content: center;
  }

  form {
    margin-bottom: 24px;
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

const Title = styled.p`
  grid-area: title;
  font-weight: bold;
  font-size: 1.2em;
  width: 100%;
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
    font-size: 1.2em;
    margin: 2px 8px 2px 0;
  }
`;

const CountText = styled.p`
  color: ${props=>(props.count===0? '#DDD' : 'var(--col-approve)')};
  margin: 2px 0;
`

const SubregionList = styled.ul`
  padding: 0;
  li {
    display: grid;
    grid-template-columns: 1fr auto auto;
    text-align: left;
    padding: 4px;
    p {
      margin: 0 8px;
    }
  }
  li:nth-child(even) {
    background-color: #EEE;
  }
`;

export default function RegionWidget(props) {

  const {id, name, country_id, producer_count, subregion_count} = props.region;
  const dispatch = useDispatch();

  let [edit, setEdit] = useState(false);
  let [subregion_in, setSubregion_in] = useState('');

  const subregions = useSelector(state=>state.places.subregions);

  function deleteRegion() {
    dispatch({type: 'DELETE_REGION', payload: {region_id: id, country_id}});   
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
        <div>
          <p>Subregions:</p>
          <SubregionList>
            {
              subregions.map((item,i)=>{
                return (
                  <li key={i}>
                    <p>{item.name}</p>
                    <p>{(Number(item.producer_count)===0? '' : (Number(item.producer_count)===1? '1 Producer' : `${item.producer_count} Producers`))}</p>
                    <button onClick={()=>deleteSubregion(item.id)}>Remove</button>
                  </li>
                )
              })
            }
          </SubregionList>
        </div>
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

      <Title>{name}</Title>
      <InfoBox>
        <div className="info-text">
          
          <CountText count={Number(producer_count)}>
            {(Number(producer_count)===1? '1 Producer' : `${producer_count} Producers`)}
          </CountText>
          <CountText count={Number(subregion_count)}>
            {(Number(subregion_count)===1? '1 Subregion' : `${subregion_count} Subregions`)}
          </CountText>
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