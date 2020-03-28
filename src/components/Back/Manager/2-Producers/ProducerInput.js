import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//-----< Component Imports >-----\\
import ManagerTitle from '../ManagerTitle';

export default function SupplierInput(props) {

  //>> Setup the tools
  let edit = useSelector(state=>state.edit.editInfo);
  let countries = useSelector(state=>state.places.countries);
  let regions = useSelector(state=>state.places.regions);
  let subregions = useSelector(state=>state.places.subregions);
  const history = useHistory();
  const dispatch = useDispatch();

  //>> Save the action for future use
  let action = props.match.params.action;

  //>> Creating state
  let [name,setName] = useState( (action==='edit' && edit.name)? edit.name : '' );
  let [description,setDescription] = useState( (action==='edit' && edit.description)? edit.description : '' );
  let [img] = useState( (action==='edit' && edit.img)? edit.img : '' );
  let [country,setCountry] = useState( (action==='edit' && edit.country_id)? edit.country_id : 'Select a country' );
  let [region,setRegion] = useState( (action==='edit' && edit.region_id)? edit.region_id : 'Select a region' );
  let [subregion,setSubregion] = useState( (action==='edit' && edit.subregion_id)? edit.subregion_id : 'Select a subregion' );
  let [website,setWebsite] = useState( (action==='edit' && edit.website_url)? edit.website_url : '');

  useEffect(()=>{
    dispatch({type: 'GET_COUNTRIES_FAVORITE'});
    if (action==='edit') {
      if (edit.country_id) {
        if (!edit.region_id) {
          dispatch({type: 'GET_REGIONS', payload: edit.country_id});
        } else if (!edit.subregion_id) {
          dispatch({type: 'GET_SUBREGIONS', payload: edit.region_id});
        }
      }
    }
  },[dispatch]);

  //>> Submits the new or edited event to the server
  function handleSubmit(event) {

    event.preventDefault();
    const inputs = {
      id: edit.id,
      name,
      description,
      img,
      country,
      region,
      subregion: (subregion==='Select a subregion'? null : subregion),
      website
    }

    switch(action) {
      case 'new':
        dispatch({type: 'NEW_PRODUCER', payload: inputs});
        break;
      case 'edit':
        dispatch({type: 'EDIT_PRODUCER', payload: inputs});
        break;
      default:
    }
    history.push('/manager/producers')
  }

  //Fills the country select with options from the country list
  function populateCountrySelect() {
    let list = countries.map( (country,i)=> {
      return <option key={i} value={country.id}>{country.name}</option>
    })
    return list;
  }

  //Fills the region select with options from the region list
  function populateRegionSelect() {
    let list = regions.map( (region,i)=> {
      return <option key={i} value={region.id}>{region.name}</option>
    })
    return list;
  }

  //Fills the subregion select with options from the subregion list
  function populateSubregionSelect() {
    let list = subregions.map( (item,i)=> {
      return <option key={i} value={item.id}>{item.name}</option>
    })
    return list;
  }

  //When the country changes, trigger the region reducer to fill from the DB
  function updateCountry(event) {
    setCountry(event.target.value);
    dispatch({type: 'GET_REGIONS', payload: event.target.value});
    setRegion('Select a region');
  }

  function updateRegion(event) {
    setRegion(event.target.value);
    dispatch({type: 'GET_SUBREGIONS', payload: event.target.value});
    setSubregion('Select a subregion');
  }
  
  return (
    <div>
      <ManagerTitle title={(action==='edit')? 'Edit Producer' : 'Add New Producer'} target="/manager/suppliers"/>
      
      <form className="inputBox section-box" onSubmit={handleSubmit}>

        <input required className="in-name" type="text" placeholder="Producer Name" value={name} onChange={(event)=>setName(event.target.value)} />

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
            <select onChange={(event)=>updateRegion(event)} value={region}>
              <option disabled>Select a region</option>
              {populateRegionSelect()}
            </select>
          </label>

          <label className="selectLabel">
            <span className="inputName">Subregion:</span>
            <select onChange={(event)=>setSubregion(event.target.value)} value={subregion}>
              <option disabled>Select a subregion</option>
              {populateSubregionSelect()}
            </select>
          </label>

          <label>
            <span className="inputName">Website:</span>
            <input type="text" value={website} onChange={(event)=>setWebsite(event.target.value)}/>
          </label>
        </div>

        <textarea required className="in-description" placeholder="Producer Bio"  value={description} onChange={(event)=>setDescription(event.target.value)}/>
        
        <button className="inputButton button-secondary center-block">Submit</button>

      </form>       
    </div>
  )
}