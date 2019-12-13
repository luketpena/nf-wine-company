import React, {Component} from 'react';
import './Home.css';

import Landing from './Landing/Landing';
import Who from './Who/Who';

class Home extends Component {
  render() {
    return (
      <main>
        <Landing/>
        <Who />
      </main>
    )
  }
}

export default Home;