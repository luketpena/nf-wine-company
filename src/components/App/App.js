//Basic Imports
import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
//Navigation Imports
import { HashRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';
//Component imports
import Manager from '../Back/Manager/Manager';
import Home from '../Front/1-Home/Home';
import CountryScraper from '../CountryScraper/CountryScraper';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'GET_EVENTS'});
    this.props.dispatch({type: 'GET_SUPPLIERS'});
    this.props.dispatch({type: 'GET_COUNTRIES'});
    this.props.dispatch({type: 'FETCH_USER'})  
  }

  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <ProtectedRoute path="/manager" component={Manager}/>
            <Route path="/scraper" component={CountryScraper}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect()(App);
