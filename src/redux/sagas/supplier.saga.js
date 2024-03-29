import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getSuppliers (action) {
  const response = yield axios.get('/suppliers');
  yield put({type: 'SET_SUPPLIERS', payload: response.data})
}

function * getSuppliersFilter (action) {
  const response = yield axios.get(`/suppliers/?search=${action.payload.search}&country=${action.payload.countryFilter}&region=${action.payload.regionFilter}&sort=${action.payload.sort}`);
  yield put({type: 'SET_SUPPLIERS', payload: response.data})
}

function * deleteSupplier (action) {
  yield axios.delete('/suppliers/'+action.payload);
  yield put({type: 'GET_SUPPLIERS'});
}

function * newSupplier (action) {
  yield axios.post('/suppliers', action.payload);
  yield put({type: 'GET_SUPPLIERS'})
}

function * quickAddSupplier (action) {
  yield axios.post('/suppliers/quickadd', action.payload);
  yield put({type: 'GET_SUPPLIERS'})
}

function * editSupplier (action) {
  console.log('Now editing supplier!');
  
  yield axios.put('/suppliers/edit', action.payload);
  yield put({type: 'GET_SUPPLIERS'});
}

export default function * eventSaga() {
  yield takeLatest('GET_SUPPLIERS', getSuppliers);
  yield takeLatest('GET_SUPPLIERS_FILTER', getSuppliersFilter);
  yield takeLatest('DELETE_SUPPLIER', deleteSupplier);
  yield takeLatest('NEW_SUPPLIER', newSupplier);
  yield takeLatest('QUICK_ADD_SUPPLIER', quickAddSupplier);
  yield takeLatest('EDIT_SUPPLIER', editSupplier);
}