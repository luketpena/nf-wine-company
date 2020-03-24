import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';

import ProducerItem from './ProducerItem';

const Container = styled.div`
  margin-top: 0;
  .title-bar {
    background-color: #EEE;
    padding: 32px;
    form {
      display: block;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      input, button {
        font-size: 1.5em;
        outline: none;
        border: none;
        height: 48px;
        padding: 4px 8px;
      }

      input {
        border-radius: 4px 0 0 4px;
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
`;

const ProducerTable = styled.table`

`;

const SortText = styled.span`
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

export default function ProducerList(props) {

  const dispatch = useDispatch();

  let paginationUnit = 1;

  let [pageSelect, setPageSelect] = useState(1);
  let [pageStart,setPageStart] = useState(0);

  const {search, setSearch, countryFilter, regionFilter, setSort, setOrder, order} = props;

  

  const producers = useSelector(state=>state.producer);

  function renderDisplaySelect() {
    if (producers && producers.length>0) {     
      const num = producers.length/paginationUnit;
      let arr = [];
      for (let i=0; i<num; i++) {
        arr.push(<Pagination key={i} displaySelect={pageSelect} index={i+1} onClick={()=>selectPage(i)}>{i+1}</Pagination>);
      }
      return arr;
    } else {
      dispatch({type: 'GET_PRODUCERS'});
    }
  }

  function selectPage(index) {
    setPageStart(paginationUnit*index);
    setPageSelect(index+1);
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_PRODUCERS_FILTER', payload: {search,countryFilter,regionFilter, sort: target}});
  }

  //Renders all available suppliers to the list
  function renderProducers() {
    let copyArray = [...producers];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];

      for (let i=pageStart; i<Math.min(copyArray.length,pageStart+paginationUnit); i++) {     
        returnArray.push(<ProducerItem producer={copyArray[i]} key={i}/>)
      }
    return returnArray;
  }

  return (
    <Container className="sec-default">
      <div className="title-bar">
        <form>
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
        {renderDisplaySelect()}
      </PaginationBox>

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
    </Container>
  )
}