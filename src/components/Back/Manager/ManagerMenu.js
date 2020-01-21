import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LogOutButton from '../../LogOutButton/LogOutButton';

//-----< Styling >-----\\
const MenuBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuItem = styled.div`
  width: 256px;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--col-primary);
  background-color: rgba(255,255,255,.2);
  transition: all .2s;
  box-shadow: 0 0 0px -2px rgba(0,0,0,0);}
  &:hover {
    background-color: rgba(255,255,255,.8);
    box-shadow: 0 16px 16px -16px rgba(0,0,0,.5);
    color: var(--col-primary-light);
    cursor: pointer;
  }
`;

//-----< Component Function >-----\\
export default function ManagerMenu () {

  const history = useHistory();

  function clickMenuItem (target) {
    history.push('/manager/' + target);
  }

  return (
    <div>
      <h1>Manager</h1>
      <LogOutButton/>
      <MenuBox>
        <MenuBox>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('events')}> <h2>Events</h2> </MenuItem>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('suppliers')}> <h2>Suppliers</h2> </MenuItem>
        </MenuBox>
        <MenuBox>
          <MenuItem className="managerMenuItem"> <h2>Producers</h2> </MenuItem>
          <MenuItem className="managerMenuItem" onClick={()=>clickMenuItem('customers')}> <h2>Customers</h2> </MenuItem>     
        </MenuBox>     
      </MenuBox>
    </div>
  )
}