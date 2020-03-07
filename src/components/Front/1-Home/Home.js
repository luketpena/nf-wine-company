import React, {Component} from 'react';
import './Home.css';

import Landing from './Landing/Landing';
import Who from './Who/Who';
import Menu from '../0-Menu/Menu';

class Home extends Component {
  render() {
    return (
      <main>
        <Menu/>
        <Landing/>
        <Who />
        <Who />
        <Who />
        <Who />
        <Who />
        <Who />
        <Who />
        <Who />
      </main>
    )
  }
}

export default Home;