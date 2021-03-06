import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 256px;
  padding: 16px;
  margin: 0 auto;
  form {
    button {
      display: block;
      margin: 0 auto;
    }
    input {
      display: block;
      margin: 8px auto;
      padding: 8px;
      width: 128px;
      border: none;
      outline: none;
      border-radius: 4px;
      text-align: center;
      font-size: 1em;
      background-color: #EEE;
    }
  }
`;

const Submit = styled.button`
  width: 128px;
`;

export default function LoginInput() {

  const dispatch = useDispatch();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

 
  function login(event) {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login 

  return (
    <Container>
      <form onSubmit={(event)=>login(event)}>  
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(event)=>setUsername(event.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(event)=>setPassword(event.target.value)}
        />

        <Submit className="button-secondary">Submit</Submit>   
      </form>
    </Container>
  )
}