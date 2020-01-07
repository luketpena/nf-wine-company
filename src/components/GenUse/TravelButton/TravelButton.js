import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

/*
This creates a button that navigates you to another page. It takes two props:
  - target = the '/' location you want to go to
  - text = the string inside the button
*/



class TravelButton extends Component {

  //Setting the custom class
  myClass = 'travel-button ' + this.props.propClass

  clicked = ()=> {
    if (this.props.clickAction) {
      this.props.clickAction();
    }
    this.props.history.push(this.props.target)
  }

  render () {
    return (
      <button className={this.myClass} onClick={this.clicked}>{this.props.text}</button>
    )
  }
}

export default withRouter(TravelButton);