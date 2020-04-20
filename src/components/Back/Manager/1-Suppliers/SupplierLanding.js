import React, {useState} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//-----< Component Imports >-----\\
import SupplierWidget from './SupplierWidget';
import ManagerTitle from '../ManagerTitle';

//-----< Styling >-----\\
const SupplierTable = styled.table`
  
`;

const SortHeader = styled.th`
  color: #DDD;
  &:hover {
    color: white;
  }
`;

const ButtonHeader = styled.th`
  width: 64px;
`;

const SortText = styled.span`
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const SearchBar = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  form {
    max-width: 500px;
    width: 100%;
    input {
      width: 100%;
    }
    button {
      display: block;
      margin: 16px auto;
    }
  }
`;

const QuickAdd = styled.div`
  text-align: center;
  form {
    input {
      font-size: 1em;
      padding: 4px;
    }
    button {
      display: block;
      margin: 8px auto;
    }
  }
`;

const DisplaySelect = styled.div`
  margin: 8px;
  text-align: center;
  color: ${props=>(props.displaySelect===props.index? 'gray' : '#DDD')};
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const DisplaySelectBox = styled.div`
  display: flex;
  justify-content: center;
`;

//-----< Component Function >-----\\
export default function SupplierLanding() {

  //>> Set up
  const dispatch = useDispatch();
  //>> Accessing reducers
  let supplier = useSelector(state=>state.supplier);
  //>> Creating state
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState('name');
  let [order,setOrder] = useState('ASC');
  let [quickAddName, setQuickAddName] = useState('');

  let [displayStart,setDisplayStart] = useState(0);
  let [displayUnit] = useState(50);
  let [displaySelect,setDisplaySelect] = useState(1);

  //Renders all available suppliers to the list
  function renderSuppliers() {
    let copyArray = [...supplier];
    if (order==='DESC') {copyArray.reverse()}
    let returnArray = [];
      for (let i=displayStart; i<Math.min(copyArray.length,displayStart+displayUnit); i++) {     
        returnArray.push(<SupplierWidget supplier={copyArray[i]} key={i}/>)
      }
    return returnArray;
  }
          
  

  //Sends the search parameters to the saga for getting the filtered supplier list
  function submitSearch(event) {
    event.preventDefault();
    dispatch({type: 'GET_SUPPLIERS_FILTER', payload: {search,sort}})
  }

  //Triggers a filtered search of suppliers with the current search parameters
  function triggerFilter(target) {
    setSort(target);
    dispatch({type: 'GET_SUPPLIERS_FILTER', payload: {search,sort: target}});
  }

  function renderDisplaySelect() {
    const num = supplier.length/displayUnit;
    let arr = [];
    for (let i=0; i<num; i++) {
      arr.push(<DisplaySelect key={i} displaySelect={displaySelect} index={i+1} onClick={()=>selectDisplay(i)}>{i+1}</DisplaySelect>);
    }
    return arr;
  }

  function selectDisplay(index) {
    setDisplayStart(displayUnit*index);
    setDisplaySelect(index+1);
  }

  //Adds a supplier to the database using the name input field
  function quickAdd(event) {
    event.preventDefault()
    const newSupplier = {
      name: quickAddName
    };
    dispatch({type: 'QUICK_ADD_SUPPLIER', payload: newSupplier});
    setQuickAddName('');
  }

  return (
    <div className="landingBox">

      <ManagerTitle title="Suppliers" target="/manager" />
      
      <TravelButton target="/manager/suppliers/new" text="Add Supplier" propClass="button-secondary center-block"/>

      <SearchBar className="section-box back-search-bar">
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search for supplier"/>         
          <button className="button-default">Search</button>
        </form>
      </SearchBar>

      <QuickAdd className="section-box">
        <h2>Quick Add</h2>
        <p>Add a supplier with a name only.</p>
        <form onSubmit={event=>quickAdd(event)}>
          <input 
            required
            type="text"
            placeholder="Supplier name"
            value={quickAddName}
            onChange={event=>setQuickAddName(event.target.value)}
          />
          <button className="button-secondary">Create</button>

        </form>
      </QuickAdd>

      <section className="section-box">
        <h2>Suppliers </h2>
        <DisplaySelectBox>
          {renderDisplaySelect()}
        </DisplaySelectBox>
        <SupplierTable>
          <thead>
            <tr>
              <SortHeader><SortText onClick={()=>triggerFilter('name')}>Supplier</SortText></SortHeader>
              <SortHeader><SortText onClick={()=>triggerFilter('type')}>Type</SortText></SortHeader>
              <th>Website</th>  
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader>&nbsp;</ButtonHeader>
              <ButtonHeader><SortText onClick={()=>setOrder((order==='ASC'? 'DESC' : 'ASC'))}>{(order==='ASC'? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}</SortText></ButtonHeader>
            </tr>
          </thead>
          <tbody>
            {renderSuppliers()}
          </tbody>
        </SupplierTable>
      </section>
    </div>
  )
}