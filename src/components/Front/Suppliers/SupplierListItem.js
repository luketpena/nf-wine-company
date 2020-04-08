import React, {useState} from 'react';
import styled from 'styled-components';
import Modal from '../../GenUse/Modal/Modal';

/*-----< Styling >-----*/
const ModalContent = styled.div`
  max-width: 800px;
  .link {
    text-decoration: none;
  }
`;

export default function SupplierListItem(props) {

  let [open, setOpen] = useState(false);

  return (
    <li>
      <p className="name" onClick={()=>setOpen(true)}>{props.supplier.name}</p>
      <Modal open={open} handleClose={()=>setOpen(false)}>
        <ModalContent>
          <h2>{props.supplier.name}</h2>
          {(props.supplier.description && <p>{props.supplier.description}</p>)}
          {(props.supplier.website_url && <a className="button-secondary link" target="_blank" href={props.supplier.website_url} rel="noopener noreferrer">Visit website</a>)}
        </ModalContent>
      </Modal>
    </li>
  )
}