import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

//-----< Styling >-----\\
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-left: 16px solid var(--col-secondary);
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px -2px rgba(0,0,0,.5);
  
  margin-bottom: 16px;

  transition: background-color .3s;

  &:hover {
    background-color: #EEE;
  }

  h3 {
    font-size: 2em;
    margin: 0;
    font-family: var(--font-title);
  }

  ul {
    padding: 0;
    border-bottom: 1px solid gray;
  }
  li {
    display: inline;
    margin-right: 32px;
    font-weight: bold;
  }
  p {
    font-style: italic;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 512px;
    width: 100vw;
  }
  button {
    margin-right: 4px;
  }
`;


//, img from the extraction of props.event
export default function EventWidget(props) {

  let {name, description, date, time, price, link_url, link_text, trade, id} = props.event;   

  const dispatch = useDispatch();
  const history = useHistory();

  let editReady = useSelector(state=>state.edit.ready);
  let [ready,setReady] = useState(false);

  function clickEdit() {
    setReady(true)
    dispatch({type: 'TRIGGER_SET_EDIT_INFO', payload: props.event});
  }

  useEffect(()=>{
    if (ready && editReady) {
      history.push('/manager/events/edit');
    }
  });
  
  function clickDelete() {
    dispatch({type: 'DELETE_EVENT', payload: {id}})
  }

  function renderLinkButton() {
    if (link_url!=='' && link_url!==null) {
      return  (
        <a href={link_url} target="_blank" rel="noopener noreferrer">
          <button className="button-secondary"> 
            {( (link_text!=='' && link_text!==null)? link_text : 'Event Link')}
          </button>
        </a>
      )
    } else {
      return <p>No link url provided</p>
    }
  }

  

  return (
    <Container>
      <div>
        <h3>{name}</h3>
        <ul>
          {(date && <li>{date.split('T')[0]}</li>)}
          {(time && <li>{time.substr(0,5)}</li>)}
          {(price && <li>${price}</li>)}
          {(trade && <li>{(trade? 'Trade Event' : 'Public Event')}</li>)}
        </ul>
        {(description && <p>{description}</p>)}
        {renderLinkButton()}
      </div>
      <div>
        <button className='button-default' onClick={clickEdit}>Edit</button>
        <button className="button-primary" onClick={()=>clickDelete(id)}>Delete</button>
      </div>
    </Container>
  )

}