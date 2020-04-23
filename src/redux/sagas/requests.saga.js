import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getRequests (action) {
  const response = yield axios.get('/api/requests');
  yield put({type: 'SET_REQUESTS', payload: response.data});
}

function * removeRequest(action) {
  yield axios.delete('/api/requests/'+action.payload)
  yield put({type: 'GET_REQUESTS'});
}

function * approveAccessRequest(action) {
  yield axios.post('/api/mail/access',action.payload);
  yield put({type: 'REMOVE_REQUEST', payload: action.payload.request.id});
  yield put({type: 'GET_REQUESTS'});
}

function * submitRequest(action) {
  yield axios.post('/api/requests', action.payload);
  yield put({type: 'GET_REQUESTS'});
}

export default function * requestSaga() {
  yield takeLatest('GET_REQUESTS', getRequests);
  yield takeLatest('REMOVE_REQUEST', removeRequest);
  yield takeLatest('APPROVE_ACCESS_REQUEST', approveAccessRequest);
  yield takeLatest('SUBMIT_REQUEST', submitRequest);
}