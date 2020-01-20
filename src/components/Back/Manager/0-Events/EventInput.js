import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//-----< Component Imports >-----\\
import BackButton from '../../../GenUse/BackButton/BackButton';

export default function SupplierInput(props) {

  let edit = useSelector(state=>state.editReducer.editInfo)
  const history = useHistory();
  const dispatch = useDispatch();

  let action = props.match.params.action;

  let [name,setName] = useState( (action==='edit' && edit.name)? edit.name : '' );
  let [description,setDescription] = useState( (action==='edit' && edit.description)? edit.description : '' );
  let [img,setImg] = useState( (action==='edit' && edit.img)? edit.img : '' );
  let [date,setDate] = useState( (action==='edit' && edit.date)? edit.date.split('T')[0] : '' );
  let [time,setTime] = useState( (action==='edit' && edit.time)? edit.time : '' );
  let [price,setPrice] = useState( (action==='edit' && edit.price)? edit.price : '');

  let [mount,setMount] = useState(false);
  
  //state = new startState(props.match.params,edit);  
  
  
  //Handles submission of the data to the server
  function handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      id: edit.id,
      name,
      description,
      img,
      date,
      time,
      price
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
      
      <div>
        <h1>{(action==='edit')? 'Edit Event' : 'Create New Event'}</h1>
        {action}
        <BackButton text='Back' propClass='button-default' />
      </div> 
      
      <form className="inputBox" onSubmit={handleSubmit}>

        <div className="in-image"></div>

        <input required className="in-name" type="text" placeholder="Event Name" value={name} onChange={(event)=>setName(event.target.value)} />

        <div className="inputLine">
          <label>
            <span className="inputName">Date:</span>
            <input required type="date" value={date} onChange={(event)=>setDate(event.target.value)}></input>
          </label>

          <label>
            <span className="inputName">Time:</span>
            <input required type="time" value={time} onChange={(event)=>setTime(event.target.value)}></input>
          </label>

          <label>
            <span className="inputName">$</span>
            <input required className="in-price" type="number" value={price} onChange={(event)=>setPrice(event.target.value)}></input>
          </label>
        </div>

        <textarea required className="in-description" placeholder="Event Description"  value={description} onChange={(event)=>setDescription(event.target.value)}/>
        
        <button className="inputButton button-secondary center-block">Submit</button>

      </form>       
    </div>
  )
}