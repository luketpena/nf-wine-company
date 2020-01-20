import React, {Component} from 'react';
import TravelButton from '../../../GenUse/TravelButton/TravelButton';
import {connect} from 'react-redux';

class SupplierLanding extends Component {

  renderSuppliers = ()=> {
    return this.props.suppliers.map( (item,i)=> {
      return (
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.country_name}</td>
          <td>{item.region_name}</td>
          <td>{item.website_url}</td>
          <td><button>Details</button></td>
          <td><button>Edit</button></td>
          <td><button>Delete</button></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="landingBox">
        <h1>Suppliers</h1>
        <TravelButton target="/manager" text="Back" propClass='button-default'/>
        <section className="section-box">
          <TravelButton target="/manager/events/update/new" text="Add Supplier" propClass="button-secondary center-block"/>
        </section>
        <section className="section-box">
          <form>
            <input type="text" placeholder="Search"/>
            <label>
              Filter:
              <select>
                <option disabled>Country</option>
              </select>
              <select>
                <option disabled>Region</option>
              </select>
            </label>
            
            <button>Submit</button>
          </form>
        </section>
        <section className="section-box">
          <h2>Suppliers</h2>
          <table className="supplierTable">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Country</th>
                <th>Region</th>
                <th>Website</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSuppliers()}
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default connect(state=>({suppliers: state.supplierReducer}))(SupplierLanding); 