import React from 'react';
import TravelButton from '../../GenUse/TravelButton/TravelButton';

export default function ManagerTitle(props) {
  return (
    <div className="header-bar">
      <h1>{props.title}</h1>
      <TravelButton target={props.target} text="Back" propClass='button-default'/>
    </div>
  )
}