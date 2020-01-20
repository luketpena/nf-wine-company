import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

//Redux + Saga
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {put,takeEvery, takeLatest} from 'redux-saga/effects';

import rootReducer from './redux/reducers';

//-----< SAGAS >-----\\
function * rootSaga () {
  yield takeEvery('GET_COUNTRIES', getCountries);
  yield takeEvery('GET_REGIONS', getRegions);

  yield takeEvery('GET_EVENTS', getEvents);
  yield takeEvery('DELETE_EVENT', deleteEvent);
  yield takeEvery('NEW_EVENT', newEvent);
  yield takeEvery('EDIT_EVENT', editEvent);

  yield takeEvery('GET_SUPPLIERS',getSuppliers);

  yield takeLatest('TRIGGER_SET_EDIT_INFO', triggerEdit);
}

function * triggerEdit (action) {
  yield put({type: 'SET_EDIT_INFO', payload: action.payload});
  yield put({type: 'SET_EDIT_READY', payload: true})
}

//Retrieves list of countries from the database
function * getCountries (action) {
  const response = yield axios.get('/places/countries');
  yield put({type: 'SET_COUNTRIES', payload: response.data});
}

//Retrieves all of the regions within a given country
function * getRegions (action) {
const response = yield axios.get('/places/regions/'+action.payload);
yield put({type: 'SET_REGIONS', payload: response.data});
}

function * getEvents (action) {
  const response = yield axios.get('/events');
  yield put({type: 'SET_EVENTS', payload: response.data})
}

function * deleteEvent (action) {
  yield axios.delete('/events/'+action.payload.id);
  yield put({type: 'GET_EVENTS'});
}

function * newEvent (action) {
  yield axios.post('/events', action.payload);
  yield put({type: 'GET_EVENTS'})
}

function * editEvent (action) {
  yield axios.put('/events/edit', action.payload);
  yield put({type: 'GET_EVENTS'});
}

function * getSuppliers (action) {
  const response = yield axios.get('/suppliers');
  yield put({type: 'SET_SUPPLIERS', payload: response.data})
}


//-----< STORE + MIDDLEWARE >-----\\
const sagaMiddlware = createSagaMiddleware();
const store = createStore (
  rootReducer,
  applyMiddleware(sagaMiddlware, logger)
)
sagaMiddlware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));