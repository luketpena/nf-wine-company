import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getEvents (action) {
  const response = yield axios.get('/events');
  yield put({type: 'SET_EVENTS', payload: response.data})
}

function * getEventsPublic (action) {
  const response = yield axios.get('/events/public');
  yield put({type: 'SET_EVENTS', payload: response.data})
}

function * getEventsTrade (action) {
  const response = yield axios.get('/events/trade');
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

export default function * eventSaga() {
  yield takeLatest('GET_EVENTS', getEvents);
  yield takeLatest('GET_EVENTS_PUBLIC', getEventsPublic);
  yield takeLatest('GET_EVENTS_TRADE', getEventsTrade);
  yield takeLatest('DELETE_EVENT', deleteEvent);
  yield takeLatest('NEW_EVENT', newEvent);
  yield takeLatest('EDIT_EVENT', editEvent);
}