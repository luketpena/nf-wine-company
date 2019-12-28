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

  componentDidMount () {
    this.props.dispatch({type: 'GET_COUNTRIES'})
  }

  handleChange = (event,prop)=> {
    this.setState({
      [prop]: event.target.value
    });
  }

  populateCountrySelect = ()=> {
    let list = this.props.countries.map( (country,i)=> {
      return <option key={i}>{country.name}</option>
    })
    return list;
  }

  updateCountry = (event,prop)=> {
    this.handleChange(event,prop);
    this.props.dispatch({type: 'GET_REGIONS', payload: event.target.value});
    this.setState({
      region: 'Select a region'
    })
  }

  populateRegionSelect = ()=> {
    let list = this.props.regions.map( (region,i)=> {
      return <option key={i}>{region.name}</option>
    })
    return list;
  }

  renderInputs = ()=> {
    switch(this.props.type) {
      case 'events':
        return <>
          <label>
            <span className="inputName">Date:</span>
            <input required type="date" value={this.state.date} onChange={(event)=>this.handleChange(event,'date')}></input>
          </label>
          <label>
            <span className="inputName">Time:</span>
            <input required type="time" value={this.state.time} onChange={(event)=>this.handleChange(event,'time')}></input>
          </label>
          <label>
            <span className="inputName">$</span>
            <input required className="in-price" type="number" value={this.state.price} onChange={(event)=>this.handleChange(event,'price')}></input>
          </label>
        </>
      case 'producers':
      case 'suppliers':
        return <>
          <label className="selectLabel">
            <span className="inputName">Country:</span>
            <select onChange={(event)=>this.updateCountry(event,'country')} value={this.state.country}>
                <option disabled>Select a country</option>
                {this.populateCountrySelect()}
              </select>
          </label>
          <label className="selectLabel">
            <span className="inputName">Region:</span>
            <select onChange={(event)=>this.handleChange(event,'region')} value={this.state.region}>
                <option disabled>Select a region</option>
                {this.populateRegionSelect()}
              </select>
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