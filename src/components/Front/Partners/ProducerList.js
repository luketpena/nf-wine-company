import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

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
  color: ${props=>(props.displaySelect===props.index? '#DDD' : 'white')};
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--col-primary);
  height: 48px;
`;

export default function ProducerList() {

  const dispatch = useDispatch();

  let paginationUnit = 50;

  let [pageSelect, setPageSelect] = useState(1);
  let [pageStart,setPageStart] = useState(0);

  const producers = useSelector(state=>state.producer);

  function renderDisplaySelect() {
    if (producers && producers.length>0) {
      console.log('The producers are in!');
      
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

  return (
    <Container className="sec-default">
      <div className="title-bar">
        <form>
          <input 
            type="text" 
            placeholder="Search producers"
          />
          <button>Go</button>
        </form>
      </div>

      <PaginationBox>
        {renderDisplaySelect()}
      </PaginationBox>
      {/* <SupplierTable>
        <thead>
          <tr>
            <SortHeader><SortText onClick={()=>triggerFilter('name')}>Producer</SortText></SortHeader>
            <SortHeader><SortText onClick={()=>triggerFilter('country')}>Country</SortText></SortHeader>
            <SortHeader><SortText onClick={()=>triggerFilter('region')}>Region</SortText></SortHeader>
            <th>Website</th>
            <ButtonHeader>&nbsp;</ButtonHeader>
            <ButtonHeader>&nbsp;</ButtonHeader>
            <ButtonHeader><SortText onClick={()=>setOrder((order==='ASC'? 'DESC' : 'ASC'))}>{(order==='ASC'? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}</SortText></ButtonHeader>
          </tr>
        </thead>
        <tbody>
          {renderProducers()}
        </tbody>
      </SupplierTable> */}
    </Container>
  )
}