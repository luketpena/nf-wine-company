import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

const Container = styled.div`
  grid-area: info;
  background-color: red;
  width: 250px;
  height: 250px;
  button {
    display: block;
    margin: 0 auto;
  }
`;
const Name = styled.p`
  text-align: center;
`;
const Email = styled.p`
  text-align: center;
`;
const Access = styled.p`
  text-align: center;
`;

export default function AccountInfo() {

  const dispatch = useDispatch();

  const user = useSelector(state=>state.user)

  let [edit, setEdit] = useState(true);
  let [username, setUsername] = useState(user.username)
  let [email, setEmail] = useState(user.email);
  
  function submitNewInfo(event) {
    event.preventDefault();
    dispatch({type: 'UPDATE_USER_INFO', payload: {id: user.id, username, email}})
    setEdit(false);
  }

  function toggleEdit() {
    setEdit(true);
    setUsername(user.username);
    setEmail(user.email);
  }

  function renderDetails() {
    if (edit) {
      return (
        <form onSubmit={submitNewInfo}>
          <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
          <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
          <button>Confirm Changes</button>
        </form>
      )
    } else {
      return (
        <>
          <Name>{user.username}</Name>
          <Email>{user.email}</Email>
          <Access>Access: {user.access}</Access>
          <button onClick={toggleEdit}>Update Settings</button>
        </>
      )
    }
  }

  return (
    <Container>
      <h2>Account Details</h2>
      {renderDetails()}
    </Container>
  )
}