import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


//-----< Component Imports >-----\\
import ManagerTitle from '../ManagerTitle';

export default function EventInput(props) {

  //>> Setup the tools
  let edit = useSelector(state=>state.edit.editInfo)
  const history = useHistory();
  const dispatch = useDispatch();

  //>> Save the action for future use
  let action = props.match.params.action;

  //>> Creating state
  let [name,setName] = useState( (action==='edit' && edit.name)? edit.name : '' );
  let [description,setDescription] = useState( (action==='edit' && edit.description)? edit.description : '' );
  let [img] = useState( (action==='edit' && edit.img)? edit.img : '' );
  let [date,setDate] = useState( (action==='edit' && edit.date)? edit.date.split('T')[0] : '' );
  let [time,setTime] = useState( (action==='edit' && edit.time)? edit.time : '' );
  let [price,setPrice] = useState( (action==='edit' && edit.price)? edit.price : '');
  let [link_url, setLink_url] = useState( (action==='edit' && edit.link_url)? edit.link_url : '');
  let [link_text, setLink_text] = useState( (action==='edit' && edit.link_text)? edit.link_text : '');
  let [trade, setTrade] = useState( (action==='edit' && edit.trade)? edit.trade : false );

  //>> Submits the new or edited event to the server
  function handleSubmit(event) {

    event.preventDefault();
    const newEvent = {
      id: edit.id,
      name,
      description,
      img,
      date,
      time,
      price,
      link_url,
      link_text,
      trade,
    }

    switch(action) {
      case 'new':
        dispatch({type: 'NEW_EVENT', payload: newEvent});
        break;
      case 'edit':
        dispatch({type: 'EDIT_EVENT', payload: newEvent});
        break;
      default:
    }
    history.push('/manager/events')
  }

  return (
    <div>
      
      <ManagerTitle title={(action==='edit')? 'Edit Event' : 'Create New Event'} target='/manager/events'/>
      
      <form className="inputBox section-box" onSubmit={handleSubmit}>

        <div className="in-image"></div>

        <input required className="in-name" type="text" placeholder="Event Name" value={name} onChange={(event)=>setName(event.target.value)} />

        <div className="inputLine">
          <label>
            <span className="inputName">Date:</span>
            <input required type="date" value={date} onChange={(event)=>setDate(event.target.value)}/>
          </label>

          <label>
            <span className="inputName">Time:</span>
            <input required type="time" value={time} onChange={(event)=>setTime(event.target.value)}/>
          </label>

          <label>
            <span className="inputName">$</span>
            <input required className="in-price" type="number" value={price} onChange={(event)=>setPrice(event.target.value)}/>
          </label>

          <label>
            <span className="inputName">Link URL:</span>
            <input required type="text" value={link_url} onChange={(event)=>setLink_url(event.target.value)}/>
          </label>

          <label>
            <span className="inputName">Link text:</span>
            <input required type="text" value={link_text} onChange={(event)=>setLink_text(event.target.value)}/>

          </label>

          <label>
            <span className="inputName">Trade Event:</span>
            <input required type="checkbox" checked={trade} onChange={event=>setTrade(event.target.checked)}/>
          </label>
        </div>

        <textarea required className="in-description" placeholder="Event Description"  value={description} onChange={(event)=>setDescription(event.target.value)}/>
        
        <button className="inputButton button-secondary center-block">Submit</button>

      </form>       
    </div>
  )
}