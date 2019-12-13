import React, {Component} from 'react';
import './Landing.css';
import { Parallax, Background } from 'react-parallax';

class Landing extends Component {
  render() {
    return (
      <section className="sec-landing">
        <div className="titleBox">
          <p>Welcome to</p>
          <h1>The New France Wine Company</h1>
        </div>
      </section>
    )
  }
}

export default Landing;