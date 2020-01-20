import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//-----< Component Imports >-----\\
import BackButton from '../../../GenUse/BackButton/BackButton';

export default function SupplierInput(props) {

  //>> Setup the tools
  let edit = useSelector(state=>state.edit.editInfo);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);
  const history = useHistory();
  const dispatch = useDispatch();

  //>> Save the action for future use
  let action = props.match.params.action;

  //>> Creating state
  let [name,setName] = useState( (action==='edit' && edit.name)? edit.name : '' );
  let [description,setDescription] = useState( (action==='edit' && edit.description)? edit.description : '' );
  let [img,setImg] = useState( (action==='edit' && edit.img)? edit.img : '' );
  let [country,setCountry] = useState( (action==='edit' && edit.country)? edit.country : 'Select a country' );
  let [region,setRegion] = useState( (action==='edit' && edit.region)? edit.region : 'Select a region' );
  let [website,setWebsite] = useState( (action==='edit' && edit.website)? edit.website : '');

  //>> Submits the new or edited event to the server
  function handleSubmit(event) {

    event.preventDefault();
    const newEvent = {
      id: edit.id,
      name,
      description,
      img,
      country,
      region,
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

  //Fills the country select with options from the country list
  function populateCountrySelect() {
    let list = countries.map( (country,i)=> {
      return <option key={i}>{country.name}</option>
    })
    return list;
  }

  //Fills the region select with options from the region list
  function populateRegionSelect() {
    let list = regions.map( (region,i)=> {
      return <option key={i}>{region.name}</option>
    })
    return list;
  }

  //When the country changes, trigger the region reducer to fill from the DB
  function updateCountry(event) {
    setCountry(event.target.value);
    dispatch({type: 'GET_REGIONS', payload: event.target.value});
    setRegion('Select a region');
  }
  
  return (
    <div>
      
      <div>
        <h1>{(action==='edit')? 'Edit Supplier' : 'Create New Supplier'}</h1>
        <BackButton text='Back' propClass='button-default' />
      </div> 
      
      <form className="inputBox" onSubmit={handleSubmit}>

        <div className="in-image"></div>

        <input required className="in-name" type="text" placeholder="Supplier Name" value={name} onChange={(event)=>setName(event.target.value)} />

        <div className="inputLine">
          <label className="selectLabel">
            <span className="inputName">Country:</span>
            <select onChange={(event)=>updateCountry(event)} value={country}>
                <option disabled>Select a country</option>
                {populateCountrySelect()}
              </select>
          </label>
          <label className="selectLabel">
            <span className="inputName">Region:</span>
            <select onChange={(event)=>setRegion(event.target.value)} value={region}>
                <option disabled>Select a region</option>
                {populateRegionSelect()}
              </select>
          </label>
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