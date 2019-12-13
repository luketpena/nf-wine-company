import React, {Component} from 'react';
import './Landing.css';
import { Parallax, Background } from 'react-parallax';

class Landing extends Component {
  render() {
    return (
      <Parallax className="sec-landing"
          blur={0}
          bgImage={require('../../../images/background.jpg')}
          bgImageAlt="Wine bottles"
          strength={250}
          bgClassName="parallax-bkg"
        >
        <div className="titleBox">
          <p>Welcome to</p>
          <h1>The New France Wine Company</h1>
        </div>
      </Parallax>
    )
  }
}

export default Landing;