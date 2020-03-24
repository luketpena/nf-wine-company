import React from 'react';
import {useSelector} from 'react-redux';
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

export default function ProducerList() {

  const producers = useSelector(state=>state.producers);

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

      <DisplaySelectBox>
        {renderDisplaySelect()}
      </DisplaySelectBox>
      <SupplierTable>
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
      </SupplierTable>
    </Container>
  )
}