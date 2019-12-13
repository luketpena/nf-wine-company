import React, {Component} from 'react';
import './Home.css';

import Landing from './Landing/Landing';
import InfoSection from '../InfoSection/InfoSection';

class Home extends Component {
  render() {
    return (
      <main>
        <Landing/>
        <InfoSection />
        <InfoSection />
        <InfoSection />
      </main>
    )
  }
}

export default Home;