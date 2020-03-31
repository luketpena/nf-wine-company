import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import RequestRow from './RequestRow';



const Container = styled.div`
  grid-area: request;
  padding: 32px;
  box-sizing: border-box;
  h2 {
    font-size: 2em;
    margin: 0 0 16px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background-color: var(--col-primary);
    color: white;
    height: 48px;
  }
  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    padding: 12px 4px;
    border-bottom: 1px dotted #DDD;
  }
`;

const AccountBox = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 16px auto;

  label {
    display: block;
    color: gray;
    margin-bottom: 16px;
  }

  select {
    width: 50%;
    min-width: max-content;
  }
`;

const RequestBox = styled.div`
  background-color: #EEE;
  padding: 8px;
  border-radius: 4px;
`;

export default function AccountRequest() {

  const dispatch = useDispatch();

  const requests = useSelector(state=>state.requests);
  const customerAccounts = useSelector(state=>state.customerAccounts);
  let [selectedAccount, setSelectedAccount] = useState('');
  
  

  useEffect(()=>{
    dispatch({type: 'GET_REQUESTS'});
    dispatch({type: 'GET_CUSTOMER_ACCOUNTS'});
  },[dispatch])

  function renderRequests() {
    return requests.map( (item,i)=> {
      return <RequestRow key={i} request={item}/>
    })
  }

  function renderAccountOptions() {
    return customerAccounts.map( (account,i)=>{
      return <option 
                key={i} 
                value={account.id} 
                account={selectedAccount}>
                  {account.username}
                </option>
    });
  }

  

  

  return (
    <Container>
      <h2>Requests</h2>

      <AccountBox>
        <label>Select a customer account. The login details for that account will be forwarded to approved requests.</label>
        <select value={selectedAccount} onChange={event=>setSelectedAccount(event.target.value)}>
          <option disabled value=''>Choose an Account</option>
          {renderAccountOptions()}
        </select>
      </AccountBox>

      <RequestBox>
        {renderRequests()}
      </RequestBox>
    </Container>
  )
}