import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getSuppliers (action) {
  const response = yield axios.get('/suppliers');
  yield put({type: 'SET_SUPPLIERS', payload: response.data})
}

export default function * supplierSaga() {
  yield takeLatest('GET_SUPPLIERS',getSuppliers);
}