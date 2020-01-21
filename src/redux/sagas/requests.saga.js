import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getRequests (action) {
  const response = yield axios.get('/api/requests');
  yield put({type: 'SET_REQUESTS', payload: response.data});
}

function * rejectAccessRequest(action) {
  yield axios.delete('/api/requests/'+action.payload)
  yield put({type: 'GET_REQUESTS'});
}

export default function * requestSaga() {
  yield takeLatest('GET_REQUESTS', getRequests);
  yield takeLatest('REJECT_ACCESS_REQUEST', rejectAccessRequest);
}