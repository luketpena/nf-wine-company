import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getUserInfo (action) {
  const response = yield axios.get('/api/user/info');
  yield put({type: 'SET_USER_INFO', payload: response.data});
}

function * updateUserInfo (action) {
  yield axios.put('/api/user/update',action.payload);
  yield put({type: 'GET_USER_INFO'});
  yield put({type: 'FETCH_USER'});
}

function * updatePassword (action) {
  yield axios.put('/api/user/password',action.payload);
  yield put({type: 'GET_USER_INFO'});
  yield put({type: 'FETCH_USER'});
}

export default function * userInfoSaga() {
  yield takeLatest('GET_USER_INFO', getUserInfo);
  yield takeLatest('UPDATE_USER_INFO', updateUserInfo);
  yield takeLatest('UPDATE_PASSWORD', updatePassword);
}