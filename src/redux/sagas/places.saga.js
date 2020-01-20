import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getCountries (action) {
  const response = yield axios.get('/places/countries');
  yield put({type: 'SET_COUNTRIES', payload: response.data});
}

function * getRegions (action) {
  const response = yield axios.get('/places/regions/'+action.payload);
  yield put({type: 'SET_REGIONS', payload: response.data});
  }

export default function * placesSaga() {
  yield takeLatest('GET_COUNTRIES', getCountries);
  yield takeLatest('GET_REGIONS', getRegions);
}