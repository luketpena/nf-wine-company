import { put, takeLatest } from 'redux-saga/effects';

function * triggerEdit (action) {
  yield put({type: 'SET_EDIT_INFO', payload: action.payload});
  yield put({type: 'SET_EDIT_READY', payload: true})
}


export default function * editSaga() {
  yield takeLatest('TRIGGER_SET_EDIT_INFO', triggerEdit);
}