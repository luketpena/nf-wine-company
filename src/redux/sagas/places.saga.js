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

function * addRegion (action) {
  yield axios.post('/places/regions', action.payload);
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

export default function * placesSaga() {
  yield takeLatest('GET_COUNTRIES', getCountries);
  yield takeLatest('GET_REGIONS', getRegions);
  yield takeLatest('ADD_REGION', addRegion);
}