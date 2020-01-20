import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * triggerEdit (action) {
  yield put({type: 'SET_EDIT_INFO', payload: action.payload});
  //>> Used for preemptively filling regions when editing resources that use them
  if (action.payload.country_id) {
    const response = yield axios.get('/places/regions/'+action.payload.country_id);
    yield put({type: 'SET_REGIONS', payload: response.data});
  }
  yield put({type: 'SET_EDIT_READY', payload: true})
}


export default function * editSaga() {
  yield takeLatest('TRIGGER_SET_EDIT_INFO', triggerEdit);
}