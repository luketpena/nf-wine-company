import React from 'react';

export default function ManagerTitle(props) {
  return (
    <div className="header-bar">
      <h1>{props.title}</h1>
    </div>
  )
}