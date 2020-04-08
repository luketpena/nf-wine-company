import React from 'react';
import styled from 'styled-components';

/*-----< Component Imports >-----*/
import SupplierListItem from './SupplierListItem';

/*-----< Styling >-----*/
const Container = styled.div`
  border-bottom: 1px solid #EEE;
  display: grid;
  grid-template-areas: "letter list";
  grid-template-columns: auto 1fr;
`;

const Letter = styled.h3`
  font-family: var(--font-illustrated);
  font-weight: lighter;
  font-size: 6em;
  margin: 0;
  text-align: left;
  color: var(--col-primary);
`;

const SupplierUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    height: max-content;
    list-style-type: disc;
    margin: 0 32px 0 0;
    cursor: pointer;
    .name {
      transition: all .2s;
    }
    &:hover .name {
      color: var(--col-primary);
      transform: scale(1.1);
    }
  }
`;

export default function SupplierListSegment(props) {

  function renderSuppliers() {
    return props.suppliers.map( (supplier,i)=>{
      return <SupplierListItem key={i} supplier={supplier} />
    });
  }

  return (
    <Container>
      <Letter>{props.letter}</Letter>
      <SupplierUl>
        {renderSuppliers()}
      </SupplierUl>
    </Container>
  )
}