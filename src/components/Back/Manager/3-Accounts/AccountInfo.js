import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

const Container = styled.div`
  grid-area: info;
  width: 250px;
  height: 250px;
  border: 2px dashed #CCC;
  margin: 4px;
  box-sizing: border-box;
  button {
    display: block;
    margin: 0 auto;
    width: 80%;
    margin: 4px auto;
  }

  input {
    display: block;
    width: 80%;
    margin: 4px auto;
    text-align: center;
  }

  label p {
    display: block;
    text-align: center;
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

  let [edit, setEdit] = useState('display');
  let [username, setUsername] = useState(user.username)
  let [email, setEmail] = useState(user.email);
  let [password, setPassword] = useState('');
  let [passwordCheck, setPasswordCheck] = useState('');
  
  function submitNewInfo(event) {
    event.preventDefault();
    dispatch({type: 'UPDATE_USER_INFO', payload: {id: user.id, username, email}})
    setEdit('display');
  }

  function submitNewPassword(event) {
    event.preventDefault();
    if (password===passwordCheck) {
      dispatch({type: 'UPDATE_PASSWORD', payload: {id: user.id, password}});
      setEdit('display');
      setPassword('');
      setPasswordCheck('');
    } else {
      alert('The passwords you entered do not match! Please try again.');
    }
  }

  function toggleEdit(target) {
    setEdit(target);
    if (target==='edit') {
      setUsername(user.username);
      setEmail(user.email);
    }
  }

  function renderDetails() {
    switch(edit) {
      case 'edit':
        return (
          <div>
            <form onSubmit={submitNewInfo}>
              <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
              <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
              <button className="button-approve-mini">Confirm Changes</button>
            </form>
            <button className="button-default-mini" onClick={()=>setEdit('display')}>Cancel</button>
          </div>
        )
        break;
      case 'display':
        return (
          <>
            <Name>{user.username}</Name>
            <Email>{user.email}</Email>
            <Access>Access: {user.access}</Access>
            <button className="button-default-mini" onClick={()=>toggleEdit('edit')}>Update Settings</button>
            <button className="button-default-mini" onClick={()=>toggleEdit('password')}>Change Password</button>
          </>
        )
        break;
      case 'password':
        return (
          <div>
            <form onSubmit={submitNewPassword}>
              <label>
                <p>New Password:</p>
                <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
              </label>
              <label>
                <p>Retype Password:</p>
                <input type="password" value={passwordCheck} onChange={(event)=>setPasswordCheck(event.target.value)} />
              </label>
              <button className="button-approve-mini">Confirm Changes</button>
            </form>
            <button className="button-default-mini" onClick={()=>setEdit('display')}>Cancel</button>
          </div>
        )
        break;
      default: return <></>;
    }
  }

  return (
    <Container>
      <h2>Details</h2>
      {renderDetails()}
    </Container>
  )
}