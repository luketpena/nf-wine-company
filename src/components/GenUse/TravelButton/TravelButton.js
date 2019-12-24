import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

/*
This creates a button that navigates you to another page. It takes two props:
  - target = the '/' location you want to go to
  - text = the string inside the button
*/

class TravelButton extends Component {

  myClass = 'travel-button ' + this.props.propClass

  render () {
    return (
      <button className={this.myClass} onClick={()=>this.props.history.push(this.props.target)}>{this.props.text}</button>
    )
  }
}

export default withRouter(TravelButton);