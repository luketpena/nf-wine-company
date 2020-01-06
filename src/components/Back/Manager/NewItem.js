import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

//-----< Component Imports >-----\\
import InputDetails from './InputDetails';
import BackButton from '../../GenUse/BackButton/BackButton';

class EventNew extends Component {

  state = {
    current: {
      type: '',
      action: '',
    },
    name: '',
    description: '',
    img: '',    
    
  }

  componentDidMount () {
    const {type, action} = this.props.match.params;
    //Set the current kind of form needed
    this.setState({
      current: {
        type: type,
        action: action
      }
    })
    //Add in unique parameters for the type
    switch(type) {
      case 'events':
        this.setState({
          date: '',
          time: '',
          price: ''
        })
        break;
      default:
        this.setState({
          country: 'Select a country',
          region: 'Select a region',
          website: ''
        })
        break;          
    }
  }

  //Turns the route in the url into a useful word for placeholders
  type = {
    events: 'Event',
    producers: 'Producer',
    suppliers: 'Supplier'
  }

  //Fill the page h1 with text depending on the current focus.
  titleText = ()=> {
    const current = this.state.current.type+this.state.current.action;

    switch(current) {
      case 'eventsnew': return 'Create New Event';
      case 'eventsedit': return 'Edit Event';

      case 'producersnew': return 'Add New Producer';
      case 'producersedit': return 'Edit Producer';

      case 'suppliersnew': return 'Add New Supplier';
      case 'suppliersedit': return 'Edit Supplier';
      
      default: return '';
    }
  }

  //Handles input changes updating state
  handleChange = (event,prop)=> {
    this.setState({
      [prop]: event.target.value
    });
  }

  //Handles submission of the data to the server
  handleSubmit = (event)=> {
    //Set up
    event.preventDefault();
    let newItem = this.state;
    console.log('New Items:',newItem);
    let route = `/${this.state.current.type}`;
    console.log('Server route:',route);
    

    //Making a post request to the server
    axios.post(route,newItem).then(response=>{
      alert(`${this.type[this.state.current.type]} added!`);
      //this.returnToEventLanding();
    }).catch(error=>{
      alert('Unable to create an event right now. Try again later.')
      console.log(error);
    })
  }

  returnToEventLanding = ()=> {
    this.props.history.push('/manager/events');
  }

  dummyData = ()=> {
    this.setState({
      name: 'Cool Event',
      date: '2019-12-03',
      time: '12:30:00',
      price: '5.50',
      description: 'This is a very cool event. Trust me.'
    });
  }

  render () {
    return (
      <div>
        <div>
          <h1>{this.titleText()}</h1>
          <BackButton text='Back' propClass='button-default' />
        </div> 
        {JSON.stringify(this.state)}
        
        <form className="inputBox" onSubmit={this.handleSubmit}>
          <div className="in-image"></div>
          <InputDetails details={this.state} type={this.state.current.type} handleChange={this.handleChange}/>
          <input required className="in-name" type="text" placeholder={`${this.type[this.props.match.params.type]} Name`} value={this.state.name} onChange={(event)=>this.handleChange(event,'name')} />
          <textarea required className="in-description" placeholder={`${this.type[this.props.match.params.type]} Description`}  value={this.state.description} onChange={(event)=>this.handleChange(event,'description')}/>
          <button className="inputButton button-secondary center-block">Submit</button>
        </form>

          {/*<button onClick={this.dummyData}>Dummy Data</button>*/}
        
      </div>
    )
  }
}

export default withRouter(EventNew);