import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * getCountries (action) {
  const response = yield axios.get('/places/countries');
  yield put({type: 'SET_COUNTRIES', payload: response.data});
}

function * getCountriesFavorite (action) {
  const response = yield axios.get('/places/countries/favorite');
  yield put({type: 'SET_COUNTRIES', payload: response.data});
}

function * getRegions (action) {
  const response = yield axios.get('/places/regions/'+action.payload);
  const details = yield axios.get('/places/country_details/'+action.payload);
  yield put ({type: 'SET_COUNTRY_DETAILS', payload: details.data[0]});
  yield put({type: 'SET_REGIONS', payload: response.data});
}

function * getSubregions (action) {
  const response = yield axios.get('/places/subregions/'+action.payload);
  yield put({type: 'SET_SUBREGIONS', payload: response.data});
}

function * addRegion (action) {
  yield axios.post('/places/regions', action.payload);
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

function * addSubregion (action) {
  yield axios.post('/places/subregions', action.payload);
  yield put({type: 'GET_SUBREGIONS', payload: action.payload.region_id});
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

function * deleteRegion (action) {
  yield axios.delete('/places/regions/'+action.payload.region_id);
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

function * deleteSubregion (action) {
  yield axios.delete('/places/subregions/'+action.payload.id);
  yield put({type: 'GET_SUBREGIONS', payload: action.payload.region_id});
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

function * updateRegion (action) {
  yield axios.put('/places/regions/'+action.payload.region_id, action.payload.updatePackage);
  yield put({type: 'GET_REGIONS', payload: action.payload.country_id});
}

function * toggleCountryFavorite(action) {
  yield axios.put('/places/countries/favorite/'+action.payload.id, {value: action.payload.value});
  const details = yield axios.get('/places/country_details/'+action.payload.id);
  yield put ({type: 'SET_COUNTRY_DETAILS', payload: details.data[0]});
}

export default function * placesSaga() {
  yield takeLatest('GET_COUNTRIES', getCountries);
  yield takeLatest('GET_COUNTRIES_FAVORITE', getCountriesFavorite);
  yield takeLatest('TOGGLE_COUNTRY_FAVORITE', toggleCountryFavorite);
  yield takeLatest('GET_REGIONS', getRegions);
  yield takeLatest('GET_SUBREGIONS', getSubregions);
  yield takeLatest('ADD_REGION', addRegion);
  yield takeLatest('ADD_SUBREGION', addSubregion);
  yield takeLatest('DELETE_REGION', deleteRegion);
  yield takeLatest('DELETE_SUBREGION', deleteSubregion);
  yield takeLatest('UPDATE_REGION', updateRegion);
}