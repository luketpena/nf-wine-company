import React, {useState} from 'react';
import Modal from '../../GenUse/Modal/Modal';

export default function SupplierListItem(props) {

  let [open, setOpen] = useState(false);

  function clickLink() {

  }

  function close() {
    setOpen(false);
    console.log('CLOSE');
    
  }

  return (
    <li>
      <p onClick={()=>setOpen(true)}>{props.supplier.name}</p>
      {(open && "OPEN!")}
      <Modal open={open} handleClose={close}>
        <h2>{props.supplier.name}</h2>
        {(props.supplier.description && <p>{props.supplier.description}</p>)}
        {(props.supplier.website_url && <a target="_blank" href={props.supplier.website_url} rel="noopener noreferrer">Visit website</a>)}
      </Modal>
    </li>
  )
}