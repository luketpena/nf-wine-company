import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';



class InputDetails extends Component {

  state = {
    date: '',
    time: '',
    price: '',
    country: 'Select a country',
    region: 'Select a region',
  }

  //Triggers an update for the countries reducer
  componentDidMount () {
    this.props.dispatch({type: 'GET_COUNTRIES'})
  }

  //Fills the country select with options from the country list
  populateCountrySelect = ()=> {
    let list = this.props.countries.map( (country,i)=> {
      return <option key={i}>{country.name}</option>
    })
    return list;
  }

  //Fills the region select with options from the region list
  populateRegionSelect = ()=> {
    let list = this.props.regions.map( (region,i)=> {
      return <option key={i}>{region.name}</option>
    })
    return list;
  }

  //When the country changes, trigger the region reducer to fill from the DB
  updateCountry = (event,prop)=> {
    this.props.handleChange(event,prop);
    this.props.dispatch({type: 'GET_REGIONS', payload: event.target.value});
    this.setState({
      region: 'Select a region'
    })
  }

  renderInputs = ()=> {
    switch(this.props.type) {
      case 'events':
        return <>
          <label>
            <span className="inputName">Date:</span>
            <input required type="date" value={this.props.details.date} onChange={(event)=>this.props.handleChange(event,'date')}></input>
          </label>
          <label>
            <span className="inputName">Time:</span>
            <input required type="time" value={this.props.details.time} onChange={(event)=>this.props.handleChange(event,'time')}></input>
          </label>
          <label>
            <span className="inputName">$</span>
            <input required className="in-price" type="number" value={this.props.details.price} onChange={(event)=>this.props.handleChange(event,'price')}></input>
          </label>
        </>

      case 'producers':
      case 'suppliers':
        return <>
          <label className="selectLabel">
            <span className="inputName">Country:</span>
            <select onChange={(event)=>this.updateCountry(event,'country')} value={this.props.details.country}>
                <option disabled>Select a country</option>
                {this.populateCountrySelect()}
              </select>
          </label>
          <label className="selectLabel">
            <span className="inputName">Region:</span>
            <select onChange={(event)=>this.props.handleChange(event,'region')} value={this.props.details.region}>
                <option disabled>Select a region</option>
                {this.populateRegionSelect()}
              </select>
          </label>
          <label>
            <span className="inputName">Website:</span>
            <input required type="text" value={this.props.details.website} onChange={(event)=>this.props.handleChange(event,'website')}/>
          </label>
        </>
    }
  }

  render () {
    return (
      <div className="inputLine">
        {this.renderInputs()}        
      </div>
    )
  }
}

export default withRouter(connect(reduxState=>({
  countries: reduxState.placesReducer.countries,
  regions: reduxState.placesReducer.regions
}))(InputDetails));