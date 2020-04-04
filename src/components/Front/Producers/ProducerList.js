import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';

import ProducerItem from './ProducerItem';
import ProducerCard from './ProducerCard';
import Modal from '../../GenUse/Modal/Modal';

const Container = styled.div`
  margin-top: 0;
  .title-bar {
    background-color: #EEE;
    padding: 16px 5%;

    form {
      display: grid;
      grid-template-areas: "input button";
      grid-template-columns: 1fr auto;

      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      
      display: flex;
      justify-content: center;

      input, button {
        font-size: 1em;
        outline: none;
        border: none;
        height: 48px;
        padding: 4px 8px;
      }

      input {
        border-radius: 4px 0 0 4px;
        width: 100%;
      }

      button {
        border-radius: 0 4px 4px 0;
        background-color: var(--col-primary);
        color: white;
        transition: background-color .2s;
        &:hover {
          background-color: var(--col-primary-light);
        }
      }
    }
  }
`;

const Pagination = styled.div`
  margin: 8px;
  text-align: center;
  font-size: 1.2em;
  color: ${props=>(props.displaySelect===props.index? 'white' : 'var(--col-primary-light)')};
  transition: all .2s;
  &:hover {
    color: white;
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--col-primary);
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 32px 8px rgba(0,0,0,.1);
`;

const ProducerTable = styled.table`

`;

const SortText = styled.span`
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const ModalContent = styled.div`

  h3 {
    font-family: var(--font-title);
    font-size: 2em;
    border-bottom: 1px solid gray;
    text-align: center;
    margin: 16px 0 0 0;
  }
  .location {
    color: #AAA;
    margin: 0;
    text-align: center;
    .divide {
      margin: 0 16px;
    }
  }
`;

const CardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  div {
    width: 40%;
  }
  @media only screen and (max-width: 600px) {
    div {
      width: 100%;
    }
  }
`;

const ProducerBox = styled.div`
  background-color: #EEE;
  overflow: hidden;
  padding-bottom: 32px;
  table {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 0 32px 8px rgba(0,0,0,.1);
  }
`;

export default function ProducerList(props) {

  const dispatch = useDispatch();
  const {search, setSearch, countryFilter, regionFilter, subregionFilter, setSort, sort, setOrder, order} = props;

  let paginationUnit = 50; //How many items per page

  let [pageSelect, setPageSelect] = useState(1);
  let [pageStart,setPageStart] = useState(0);
  let [open, setOpen] = useState(false);
  let [targetProducer, setTargetProducer] = useState({});
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const producers = useSelector(state=>state.producer);

  useEffect(()=>{
    dispatch({type: 'GET_PRODUCERS'})
  },[dispatch]);

  

  useEffect(()=>{
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize',handleResize);
  });


  function renderPagination() {
    if (producers && producers.length>0) {     
      const num = producers.length/paginationUnit;
      let arr = [];
      for (let i=0; i<num; i++) {
        arr.push(<Pagination key={i} displaySelect={pageSelect} index={i+1} onClick={()=>selectPage(i)}>{i+1}</Pagination>);
      }
      return arr;
    }
  }

  function selectPage(index) {
    setPageStart(paginationUnit*index);
    setPageSelect(index+1);
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,country: countryFilter, region: regionFilter, subregion: subregionFilter, sort: target}});
  }

  function submitSearch(event) {
    event.preventDefault();
    console.log('My regionFilter:', countryFilter);
    
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,country: countryFilter, region: regionFilter, subregion: subregionFilter, sort}});
  }

  //Renders all available suppliers to the list
  function renderProducers() {
    let copyArray = [...producers];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];
      for (let i=pageStart; i<Math.min(copyArray.length,pageStart+paginationUnit); i++) {     
        returnArray.push(<ProducerItem producer={copyArray[i]} key={i} setTargetProducer={setTargetProducer} setOpen={setOpen}/>)
      }
    return returnArray;
  }
  
  function renderModalContents() {
    return (
      <div>
        {(targetProducer.name? <h3>{targetProducer.name}</h3> : <></>)}
        <p className="location">
          {(targetProducer.country_name? <span>{targetProducer.country_name}</span> : <></>)}
          {(targetProducer.country_name && targetProducer.region_name? <span className="divide">-</span> : <></>)}
          {(targetProducer.region_name? <span>{targetProducer.region_name}</span> : <></>)}
        </p>
        {(targetProducer.description? <p className="description">{targetProducer.description}</p> : <></>)}
        {(targetProducer.website_url? <button className="button-front">Visit them online</button> : <></>)}
      </div>
    )
  }

  function renderProducerList() {
    if (windowWidth>700) {
      return (
        <ProducerTable>
          <thead>
            <tr>
              <th className="sort"><SortText onClick={()=>triggerFilter('name')}>Producer</SortText></th>
              <th className="sort"><SortText onClick={()=>triggerFilter('country')}>Country</SortText></th>
              <th className="sort"><SortText onClick={()=>triggerFilter('region')}>Region</SortText></th>
              <th><SortText onClick={()=>setOrder((order==='ASC'? 'DESC' : 'ASC'))}>{(order==='ASC'? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}</SortText></th>
            </tr>
          </thead>
          <tbody>
            {renderProducers()}
          </tbody>
      </ProducerTable>
      )
    } else {
      let copyArray = [...producers];
      if (order==='DESC') {copyArray.reverse()}
      let returnArray = [];
        for (let i=pageStart; i<Math.min(copyArray.length,pageStart+paginationUnit); i++) {     
          returnArray.push(<ProducerCard producer={copyArray[i]} key={i} setTargetProducer={setTargetProducer} setOpen={setOpen}/>)
        }
      return (
        <CardBox>
          {returnArray}
        </CardBox>
      )
    }
  }

  return (
    <Container className="sec-default">
      <div className="title-bar">
        <form onSubmit={event=>submitSearch(event)}>
          <input 
            type="text" 
            placeholder="Search producers"
            value={search}
            onChange={event=>setSearch(event.target.value)}
          />
          <button>Go</button>
        </form>
      </div>

      <PaginationBox>
        {renderPagination()}
      </PaginationBox>

      <ProducerBox>
        {renderProducerList()}
      </ProducerBox>

      <Modal open={open} handleClose={()=>setOpen(false)}>
        <ModalContent>
          {renderModalContents()}
        </ModalContent>
      </Modal>
    </Container>
  )
}