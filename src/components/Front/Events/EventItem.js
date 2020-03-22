import React, {useState} from 'react';
import styled from 'styled-components';

import Modal from '../../GenUse/Modal/Modal';

const Container = styled.div`
  display: grid;
  grid-template-areas: "date point info button";
  grid-template-columns: auto auto 1fr auto;

  min-height: 100px;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 8px;
  border-radius: 8px;

  transition: background-color .3s;

  &:hover {
    background-color: #EEE;
  }

  .date {
    grid-area: date;
    margin: 0;
    font-size: 1em;
  }

  .point {
    grid-area: point;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .info {
    grid-area: info;
    * {
      margin: 0;
    }
  }

  .button {
    grid-area: button;
  }
  
`;

const ModalContent = styled.div`
  h3 {
    color: var(--col-primary);
    margin: 0 16px 16px 16px;
    border-bottom: 1px solid gray;
  }
`;


const Point = styled.div`
  width: 1em;
  height: 1em;
  background-color: var(--col-primary);
  border-radius: 50%;
  margin: 0 8px;
`;

const Line = styled.div`
  width: 0;
  border-left: 2px solid var(--col-primary);
  justify-self: center;
  margin: 4px 0;
`;

export default function EventItem(props) {

  const {name, description, time, date, location} = props.event;

  let [detailsActive, setDetailsActive] = useState(false);

  function renderLine() {
    if (!props.last) {
      return  <Line/>
    } else {
      return <></>
    }
  }

  function convertTime(time) {
    let pieces = time.substr(0,5).split(':'); //Split it into hours and minutes    
    pieces.push( (pieces[0]/12 >= 1? ' PM' : ' AM') ); //Generate PM or AM
    pieces.splice(1,0,':'); //Reinsert the :
    pieces[0] = Number(pieces[0]) % 12; //Make it a 12-hour clock
    if (pieces[0]===0) {
      pieces[0] = 12; //Set the start point to 12 from 0
    }
    
    //Add the string back together and return
    return pieces.join('');
  }

  function renderLocation() {
    let finalString = '';
    let array = [];
    if (time) {
      array.push(convertTime(time));
    };
    if (location) {
      array.push(`at ${location}`);
    }

    finalString = array.join(' ');
    finalString = finalString.charAt(0).toUpperCase() + finalString.slice(1);

    return finalString;
  }

  return (
    <Container>
      <p className="date">{date.split('T')[0]}</p>

      <div className="point">
        <Point/>
        {renderLine()}
      </div>

      <div className="info">
        <h3>{name}</h3>
        <p>{renderLocation()}</p>
      </div>

      <div className="button">
        <button className="button-front-static" onClick={()=>setDetailsActive(true)}>Details</button>
      </div>

      <Modal open={detailsActive} handleClose={()=>setDetailsActive(false)}>
        <ModalContent>
          <h3>{name}</h3>
          <p></p>
          <p>{description}</p>
        </ModalContent>
      </Modal>
    </Container>
  )
}