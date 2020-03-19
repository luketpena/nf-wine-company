import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: gray;

  display: grid;
  grid-template-areas: "date point info button";
  grid-template-columns: auto auto 1fr auto;

  min-height: 100px;

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
  
`;


const Point = styled.div`
  width: 1em;
  height: 1em;
  background-color: red;
  border-radius: 50%;
  margin: 0 8px;
`;

const Line = styled.div`
  width: 0;
  border-left: 2px solid red;
  justify-self: center;
  margin: 4px 0;
`;

export default function EventItem(props) {

  const {name, description, time, date, location} = props.event;

  return (
    <Container>
      <p className="date">{date}</p>

      <div className="point">
        <Point/>
        <Line/>
      </div>
    </Container>
  )
}