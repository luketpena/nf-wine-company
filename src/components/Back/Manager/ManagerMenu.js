import React from 'react';
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LogOutButton from '../../LogOutButton/LogOutButton';

/*-----< Styling >-----*/
const Container = styled.div`
  box-sizing: border-box;
  padding: 10% 0;
  h1 {
    margin: 0 auto;
  }
  button {
    display: block;
    margin: 32px auto;
  }
`;

const MenuBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuItem = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 0 4px black;
  background-color: rgba(255,255,255,.2);
  transition: all .2s;
  box-shadow: 0 0 0px -2px rgba(0,0,0,0);}
  &:hover {
    background-color: rgba(255,255,255,.8);
    box-shadow: 0 0 16px 0 rgba(0,0,0,.5);
    color: var(--col-primary-light);
    cursor: pointer;
    text-shadow: none;
  }
`;

/*-----< Component Function >-----*/
export default function ManagerMenu () {

  const history = useHistory();
  const user = useSelector(state=>state.user);

  function clickMenuItem (target) {
    history.push('/manager/' + target);
  }

  return (
    <Container>

      <h1>Welcome, {user.username}</h1>
      
      <MenuBox>

        <MenuBox>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('events')}> <h2>Events</h2> </MenuItem>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('suppliers')}> <h2>Suppliers</h2> </MenuItem>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('producers')}> <h2>Producers</h2> </MenuItem>
        </MenuBox>
        
        <MenuBox>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('regions')}> <h2>Regions</h2> </MenuItem>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('accounts')}> <h2>Accounts</h2> </MenuItem>     
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('files')}> <h2>Files</h2> </MenuItem>  
        </MenuBox>   

      </MenuBox>

      <LogOutButton className="button-primary"/>

    </Container>
  )
}