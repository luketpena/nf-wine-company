import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getProducers (action) {
  const response = yield axios.get('/producers');
  yield put({type: 'SET_PRODUCERS', payload: response.data})
}

function * getProducersFilter (action) {
  const response = yield axios.get(`/producers/?search=${action.payload.search}&country=${action.payload.country}&region=${action.payload.region}&sort=${action.payload.sort}`);
  yield put({type: 'SET_PRODUCERS', payload: response.data})
}

function * deleteProducer (action) {
  yield axios.delete('/producers/'+action.payload);
  yield put({type: 'GET_PRODUCERS'});
}

function * newProducer (action) {
  yield axios.post('/producers', action.payload);
  yield put({type: 'GET_PRODUCERS'})
}

function * editProducer (action) {
  yield axios.put('/producers/edit', action.payload);
  yield put({type: 'GET_PRODUCERS'});
}

export default function * eventSaga() {
  yield takeLatest('GET_PRODUCERS', getProducers);
  yield takeLatest('GET_PRODUCERS_FILTER', getProducersFilter);
  yield takeLatest('DELETE_PRODUCER', deleteProducer);
  yield takeLatest('NEW_PRODUCER', newProducer);
  yield takeLatest('EDIT_PRODUCER', editProducer);
}