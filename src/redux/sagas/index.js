import { all } from 'redux-saga/effects';
import editSaga from './edit.saga';
import eventSaga from './event.saga';
import placesSaga from './places.saga';
import supplierSaga from './supplier.saga';

export default function* rootSaga() {
  yield all([
    eventSaga(),
    editSaga(),
    placesSaga(),
    supplierSaga()
  ]);
}
