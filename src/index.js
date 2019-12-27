import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

//Redux + Saga
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {put,takeEvery} from 'redux-saga/effects';
import axios from 'axios';

//-----< SAGAS >-----\\
function * rootSaga () {
  yield takeEvery('GET_COUNTRIES', getCountries);
  yield takeEvery('GET_REGIONS', getRegions);
}

//Retrieves list of countries from the database
function * getCountries (action) {
    const response = yield axios.get('/places/countries');
    yield put({type: 'SET_COUNTRIES', payload: response.data});
}

function * getRegions (action) {
  const response = yield axios.get('/places/regions/'+action.payload);
  yield put({type: 'SET_REGIONS', payload: response.data});
}

//-----< REDUCERS >-----\\
const placesReducer = (state={
    countries: [],
    regions: []
  }, action) => {
  switch(action.type) {
    case 'SET_COUNTRIES': return {...state, countries: action.payload}
    case 'SET_REGIONS': return {...state, regions: action.payload}
    default: return state;
  }
}

//-----< CREATING THE STORE >-----\\
const sagaMiddlware = createSagaMiddleware();
const storeInstance = createStore (
  combineReducers({
    placesReducer,
  }),
  applyMiddleware(sagaMiddlware, logger)
)
sagaMiddlware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
