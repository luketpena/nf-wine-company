import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

/*
This creates a button that navigates you to another page. It takes two props:
  - text = the string inside the button
  - propClass = the classes you wanted to add to the button

It always just navigates back a page
*/

class TravelButton extends Component {

  myClass = 'travel-button ' + this.props.propClass

  render () {
    return (
      <button className={this.myClass} onClick={()=>this.props.history.goBack()}>{this.props.text}</button>
    )
  }
}

export default withRouter(TravelButton);