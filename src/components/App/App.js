import React from 'react';
import './App.css';
import Manager from '../Manager/Manager';

import { HashRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/manager" component={Manager}/>
        </Switch>
        

      </Router>
      
    </div>
  );
}

export default App;
