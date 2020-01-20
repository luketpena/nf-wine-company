import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

//Redux + Saga
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {put,takeEvery} from 'redux-saga/effects';

//-----< SAGAS >-----\\
function * rootSaga () {
  yield takeEvery('GET_COUNTRIES', getCountries);
  yield takeEvery('GET_REGIONS', getRegions);

  yield takeEvery('GET_EVENTS', getEvents);
  yield takeEvery('DELETE_EVENT', deleteEvent);
  yield takeEvery('NEW_EVENT', newEvent);
  yield takeEvery('EDIT_EVENT', editEvent);

  yield takeEvery('GET_SUPPLIERS',getSuppliers);
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

//-----< REDUCERS >-----\\
const editReducer = (state={ editInfo: {} }, action)=> {
  switch(action.type) {
    case 'SET_EDIT': return { editInfo: action.payload };
    default: return state;
  }
}

const eventReducer = (state=[],action)=> {
  switch(action.type) {
    case 'SET_EVENTS': return action.payload;
    default: return state;
  }
}

const supplierReducer = (state=[],action)=> {
  switch(action.type) {
    case 'SET_SUPPLIERS': return action.payload;
    default: return state;
  }
}

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


//-----< STORE + MIDDLEWARE >-----\\
const sagaMiddlware = createSagaMiddleware();
const storeInstance = createStore (
  combineReducers({
    editReducer,
    placesReducer,
    eventReducer,
    supplierReducer
  }),
  applyMiddleware(sagaMiddlware, logger)
)
sagaMiddlware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));