import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
  grid-area: user;
  background-color: purple;
  height: 250px;
  width: 250px;
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
    </Container>
  )
}