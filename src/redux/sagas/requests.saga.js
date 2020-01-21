import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getRequests (action) {
  const response = yield axios.get('/api/requests');
  yield put({type: 'SET_REQUESTS', payload: response.data});
}

export default function * requestSaga() {
  yield takeLatest('GET_REQUESTS', getRequests);
  
}