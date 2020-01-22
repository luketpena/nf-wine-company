import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';


const Container = styled.div`
  grid-area: user;
  height: 250px;
  width: 250px;
  text-align: center;
  border: 2px dashed #CCC;
  margin: 4px;
  box-sizing: border-box;
  button {
    display: block;
    margin: 0 auto;
    width: 80%;
  }
`;

export default function AccountInfo() {

  const dispatch = useDispatch();
  const history = useHistory();

  let [mount,setMount] = useState(false);

  const userInfo = useSelector(state=>state.userInfo);

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'GET_USER_INFO'});
    }
  },[mount,dispatch])

  function clickModify() {
    history.push('/manager/accounts/modify');
  }

  return (
    <Container>
      <h2>Accounts</h2>
      <p>{(userInfo.length===1? 'There is 1 account.' : `There are ${userInfo.length} accounts.`)}.</p>
      <button onClick={clickModify}>Modify Accounts</button>
    </Container>
  )
}