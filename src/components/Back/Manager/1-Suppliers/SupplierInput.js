import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//-----< Component Imports >-----\\
import ManagerTitle from '../ManagerTitle';

export default function SupplierInput(props) {

  //>> Setup the tools
  let edit = useSelector(state=>state.edit.editInfo);
  const history = useHistory();
  const dispatch = useDispatch();

  //>> Save the action for future use
  let action = props.match.params.action;

  //>> Creating state
  let [name,setName] = useState( (action==='edit' && edit.name)? edit.name : '' );
  let [description,setDescription] = useState( (action==='edit' && edit.description)? edit.description : '' );
  let [img] = useState( (action==='edit' && edit.img)? edit.img : '' );
  let [website,setWebsite] = useState( (action==='edit' && edit.website_url)? edit.website_url : '');

  //>> Submits the new or edited event to the server
  function handleSubmit(event) {

    event.preventDefault();
    const newEvent = {
      id: edit.id,
      name,
      description,
      img,
      website
    }

    switch(action) {
      case 'new':
        dispatch({type: 'NEW_SUPPLIER', payload: newEvent});
        break;
      case 'edit':
        dispatch({type: 'EDIT_SUPPLIER', payload: newEvent});
        break;
      default:
    }
    history.push('/manager/suppliers')
  }
  
  return (
    <div>
      <ManagerTitle title={(action==='edit')? 'Edit Supplier' : 'Create New Supplier'} target="/manager/suppliers"/>
      
      <form className="section-box" onSubmit={handleSubmit}>

        <input required className="in-name" type="text" placeholder="Supplier Name" value={name} onChange={(event)=>setName(event.target.value)} />

        <div className="inputLine">
          <label>
            <span className="inputName">Website:</span>
            <input type="text" value={website} onChange={(event)=>setWebsite(event.target.value)}/>
          </label>
        </div>

        <textarea required className="in-description" placeholder="Supplier Bio"  value={description} onChange={(event)=>setDescription(event.target.value)}/>
        
        <button className="inputButton button-secondary center-block">Submit</button>

      </form>       
    </div>
  )
}