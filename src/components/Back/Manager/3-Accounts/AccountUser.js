import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
  grid-area: user;
  background-color: purple;
  height: 250px;
  width: 250px;
  button {
    display: block;
    margin: 0 auto;
  }
`;

export default function AccountInfo() {

  const dispatch = useDispatch();

  let [mount,setMount] = useState(false);

  const userInfo = useSelector(state=>state.userInfo);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'GET_USER_INFO'});
    }
  })

  return (
    <Container>
      {JSON.stringify(userInfo)}
      <p>{(userInfo.length===1? 'There is 1 account.' : `There are ${userInfo.length} accounts.`)}.</p>
      <button>Modify Accounts</button>
    </Container>
  )
}