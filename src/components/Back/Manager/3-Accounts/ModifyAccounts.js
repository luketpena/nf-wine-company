import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import AccountRow from './AccountRow';

const Container = styled.div`
`;

const CreateAccountBox = styled.div`
  min-width: 500px;
  button {
    display: block;
    margin: 0 auto;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
`;

const LabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  width: 200px;
  text-align: right;
  label {
    margin: 4px 0;
  }
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  width: 250px;
  input, select {
    margin: 4px 0;
    width: 100%;
  }
`;

const AccountBox = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }
  thead {
    background-color: var(--col-primary);
    color: white;
  }
`;

export default function ModifyAccounts() {

  const dispatch = useDispatch();

  const userInfo = useSelector(state=>state.userInfo);

  let [mount,setMount] = useState(false);
  let [username,setUsername] = useState('');
  let [password,setPassword] = useState('');
  let [passwordCheck,setPasswordCheck] = useState('');
  let [access,setAccess] = useState('customer');
  let [email,setEmail] = useState('');

  useEffect(()=>{
    if (!mount) {
      setMount(true);
      dispatch({type: 'GET_USER_INFO'});
    }
  },[mount]);

  function renderAccounts() {
    return userInfo.map( (item,i)=>{
      return <AccountRow key={i} account={item} />
    });
  }

  function submitNewUser(event) {
    event.preventDefault();

    //>> Check for Errors
    if (!username) {return alert('Please enter a username.');}
    if (!password) {return alert('Please enter a password.');}
    if (password!==passwordCheck) {return alert('The passwords to not match. Please reenter your password and try again.');}
    if (!email && access!=='customer') {return alert('Admin access accounts require an email address to register.');}

    dispatch({
      type: 'REGISTER',
      payload: { username, password, email, access },
    });
    setUsername('');
    setPassword('');
    setPasswordCheck('');
    setEmail('');
  }

  return (
    <Container>
      <h1>Modify Accounts</h1>
      <CreateAccountBox className="section-box">
      <h2>Create New Account</h2>
        <form onSubmit={submitNewUser}>
          <InputBox>
            <LabelColumn> 
              <label for="in-username">Username:</label>
              <label for="in-email">Email:</label>
              <label for="in-password">Password:</label>
              <label for="in-passwordCheck">Confirm password:</label>
              <label for="in-access">Access Level:</label>
            </LabelColumn>
            <InputColumn>
              <input type="text" id="in-username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
              <input type="email" id="in-email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
              <input type="password" id="in-password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
              <input type="password" id="in-passwordCheck" value={passwordCheck} onChange={(event)=>setPasswordCheck(event.target.value)}/>
              <select value={access} id="in-access" onChange={(event)=>setAccess(event.target.value)}>
                <option value='admin'>Admin</option>
                <option value='customer'>Customer</option>
              </select>
            </InputColumn>
          </InputBox>
          <button>Submit</button>
        </form>
      </CreateAccountBox>

      <AccountBox className="section-box">
        <h2>Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Access</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {renderAccounts()}
          </tbody>
        </table>
      </AccountBox>

    </Container>
  )
}