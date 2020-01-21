import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import RequestRow from './RequestRow';

const Container = styled.div`
  grid-area: request;
  background-color: yellow;
`;

export default function AccountRequest() {

  const dispatch = useDispatch();

  const requests = useSelector(state=>state.requests);

  let [mount,setMount] = useState(false);
  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'GET_REQUESTS'});
    }
  },[mount,dispatch])

  function renderRequests() {
    return requests.map( (item,i)=> {
      return <RequestRow key={i} request={item}/>
    })
  }

  return (
    <Container>
      <h2>Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Notes</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {renderRequests()}
        </tbody>
      </table>
    </Container>
  )
}