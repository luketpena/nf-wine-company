import React from 'react';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const BackButton = styled.button`
  width: 100%;
  color: white;
  background-color: rgba(165, 42, 42, .9);
  border: none;
  outline: none;
  font-size: 1em;
  padding: 8px;
  .icon {
    margin-right: 16px;
  }
`;

export default function TradeBackButton() {

  const history = useHistory();

  return (
    <div>
      <BackButton onClick={()=>history.push('/')}>
        <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
        Return to main website
      </BackButton>
    </div>
  )
}