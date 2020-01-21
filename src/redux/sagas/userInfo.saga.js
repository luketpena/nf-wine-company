import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getUserInfo (action) {
  const response = yield axios.get('/api/user/info');
  yield put({type: 'SET_USER_INFO', payload: response.data});
}

export default function * userInfoSaga() {
  yield takeLatest('GET_USER_INFO', getUserInfo);
  
}